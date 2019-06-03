import xml.etree.ElementTree as ET
import mysql.connector 
tree = ET.parse('../data/pacientes.xml')

attrs = []
pacientes = []
paciente = {}


root = tree.getroot()
#print root.tag

#for each patient in doc
for child in root:
    for c in child:
        attrs.append(c.tag)
        paciente[c.tag] = c.text
        #print paciente[c.tag]
        #print c.tag , ": " , c.text
    pacientes.append(paciente)
    paciente = {}

attrs = list(dict.fromkeys(attrs))



mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="root",
  database="desafio-cern"
)

mycursor = mydb.cursor()




#"INSERT INTO pacentes (Datetime,Item,Value) VALUES ('{}', '{}', '{}')"
sql1 = "INSERT INTO pacientes ("
sql2 = ""
for patient in pacientes:
    for attr in attrs:
        if not(attr in patient) or patient[attr] == None:
            patient[attr] = "Nao informado "
        sql1+=attr + ","
        sql2+="'" + patient[attr] + "',"
    
    sql2 = sql2[0:-1]
    sql1 = sql1[0:-1] + ") VALUES (" + sql2 + ")"
    result = mycursor.execute(sql1)
    mydb.commit()
    print ("Record inserted successfully into python_users table")
    sql1 = "INSERT INTO pacientes ("
    sql2 = ""
    
mycursor.close()
mydb.close()    










#mycursor.execute(sql)

