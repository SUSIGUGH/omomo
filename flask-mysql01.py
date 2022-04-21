from flask import Flask, render_template, request, session
import pymysql
import requests
import random
from werkzeug.utils import secure_filename
#from flask.ext.session import Session

url = "https://www.fast2sms.com/dev/bulk"

db = pymysql.connect(host='localhost', user='omomo', password='Omomo#1234', database='omomo')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'BCwW0O4oFfXlTIcaEyHZM1qRxg6LhrP7JKV2tekD85GvsjNunAgbdy4wYJoNF9pP5T7kv8qnISiazR'

#Retrive All Momos
@app.route('/momo')
def getmomo():
    cursor = db.cursor()
    sql = "SELECT * FROM momo"
    cursor.execute(sql)
    results = cursor.fetchall()
    #for i in results:
    #    print(i)
    #db.close()
    #return results
    return render_template('momo.html', results=results)

#Insert Momo
@app.route('/addmomo', methods=['GET', 'POST'])
def addmomo():
    if request.method == "POST":
        details = request.form
        momo_name = details['momo_name']
        price = details['price']
        #file = request.files.get('file')
        momo_pic = details['momo_pic']
        cursor = db.cursor()
        cursor.execute("INSERT INTO momo(momo_name, price, momo_pic) VALUES (%s, %s, %s)", (momo_name, price, momo_pic))
        db.commit()
        #cur.close()
        return ' Momo Add Successful '
    return render_template('addmomo.html')
#Confirm Regsitration with Secret Code
@app.route('/registerconfirm', methods=['GET', 'POST'])
def registerconfirm():
    if request.method == "POST":
        details = request.form
        SecretCode = details['SecretCode']
        UserMobile = session.get('UserMobile', None)
        #print(UserMobile)
        cursor = db.cursor()
        cursor.execute("SELECT secretcode FROM register where usermobile=%s", UserMobile)
        sc = cursor.fetchone()
        for row in sc:
            chksc=row
            print('Secret Code',SecretCode)
            if SecretCode == str(chksc):
                cursor.execute("UPDATE register set accountstatus=1 where usermobile=%s", UserMobile)
                db.commit()
                return ' Confirmed Registration'
            else:
                return 'Invalid Secret Code'
        db.commit()
        #cur.close()
        return ' Registration Confirmed '
    return render_template('registerconfirm.html')
#Register User and Send Secret Code using FAST2SMS
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        details = request.form
        UserName = details['UserName']
        UserId = details['UserId']
        UserMobile = details['UserMobile']
        session['UserMobile'] = details['UserMobile']
        UserPassword = details['UserPassword']
        UserAddress = details['UserAddress']
        UserEmail = details['UserEmail']
        #Generate random 4 digit number as secret code
        SecretCode = random.randint(1000,9999)
        SenderDet = {
            # Your default Sender ID
            'sender_id': 'FSTSMS', 
            #Message to send
            'message': 'Your Code is : ' + str(SecretCode), 
            'language': 'english',
            'route': 'p',
            'numbers': UserMobile    
        }
        headers = {
            'authorization': 'BCwW0O4oFfXlTIcaEyHZM1qRxg6LhrP7JKV2tekD85GvsjNunAgbdy4wYJoNF9pP5T7kv8qnISiazRLV',
            'Content-Type': "application/x-www-form-urlencoded",
            'Cache-Control': "no-cache"
        }
        response = requests.request("POST",
                            url,
                            data = SenderDet,
                            headers = headers)

        #Check if user already exists
        cursor = db.cursor()
        cursor.execute("SELECT count(*) FROM register where userid=%s",[UserId])
        #or usermobile=%s or useremail=%s", [UserId,UserMobile,UserEmail])
        usr = cursor.fetchone()
        for row in usr:
            chkusr=row
        cursor.execute("SELECT count(*) FROM register where usermobile=%s", UserMobile)
        mob = cursor.fetchone()
        for row in mob:
            chkmob=row
            #print(chkmob)
        if(chkusr == 0 and chkmob == 0):
            response = requests.request("POST",
                            url,
                            data = SenderDet,
                            headers = headers)
            cursor.close()
            cursor = db.cursor()
            cursor.execute("INSERT INTO register(secretcode, useremail, username, userid, useraddress, userpassword, usermobile) VALUES (%s, %s, %s, %s, %s, %s, %s)", (SecretCode,UserEmail,UserName, UserId, UserAddress, UserPassword, UserMobile))
            db.commit()
            cursor.close()
            return render_template('registerconfirm.html')
        else:
            if(chkusr >= 1):
                return '<html><body><h1>User Id Already exists Please Use Another User Id </body></html>'
            if(chkmob >= 1):
                return '<html><body><h1>User Mobile Already exists Please Use Another Mobile </body></html>'


    return render_template('register.html')

@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == "POST":
        details = request.form
        momo_name = details['momo_name']
        price = details['price']
        #file = request.files.get('file')
        momo_pic = details['momo_pic']
        #momo_pic = secure_filename(file.filename)
        #momo_pic = read_file(file)
        cursor = db.cursor()
        cursor.execute("INSERT INTO momo(momo_name, price, momo_pic) VALUES (%s, %s, %s)", (momo_name, price, momo_pic))
        db.commit()
        #cur.close()
        return ' Order Successful '
    return render_template('order.html')
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    #someName()
  app.run(debug=True)