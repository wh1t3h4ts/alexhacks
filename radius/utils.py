import MySQLdb
from django.conf import settings

def get_radius_conn():
    db = settings.DATABASES['radius']
    return MySQLdb.connect(
        host=db['HOST'],
        user=db['USER'],
        passwd=db['PASSWORD'],
        db=db['NAME'],
        charset='utf8mb4'
    )

def insert_radcheck(username, password):
    conn = get_radius_conn()
    cur = conn.cursor()
    cur.execute("REPLACE INTO radcheck (username, attribute, op, value) VALUES (%s, 'Cleartext-Password', ':=', %s)", (username, password))
    conn.commit()
    cur.close()
    conn.close()

def assign_radusergroup(username, groupname):
    conn = get_radius_conn()
    cur = conn.cursor()
    cur.execute("REPLACE INTO radusergroup (username, groupname) VALUES (%s, %s)", (username, groupname))
    conn.commit()
    cur.close()
    conn.close()
