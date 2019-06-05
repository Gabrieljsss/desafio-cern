import xml.etree.ElementTree as ET
import mysql.connector 


'''
Gera  uma tabela a partir das informacoes armazenadas no xml

'''

tree = ET.parse('../data/pacientes.xml')

attr = []


for elem in tree.iter():
    attr.append(elem.tag)
attr = list(dict.fromkeys(attr))

#recebe todas as tags para gerar a base de dados
print len(attr)


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="root",
  database="desafio-cern"
)

mycursor = mydb.cursor()

#mycursor.execute("CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))")
sql = "CREATE TABLE pacientes (id INT AUTO_INCREMENT PRIMARY KEY, "
for elem in attr:
    sql= sql + " " + elem + " VARCHAR(25),"

sql = sql[0:(len(sql)-1)]
print sql

sql+=")"

mycursor.execute(sql)

