import socket
import random
import pyrad.packet
from pyrad.client import Client
from pyrad.dictionary import Dictionary

# Example CoA disconnect function

def send_coa_disconnect(nas_ip, secret, username, acct_session_id=None):
    client = Client(server=nas_ip, secret=secret.encode(), dict=Dictionary("/etc/freeradius/dictionary"))
    req = client.CreateCoAPacket(code=pyrad.packet.DisconnectRequest)
    req["User-Name"] = username
    if acct_session_id:
        req["Acct-Session-Id"] = acct_session_id
    req["NAS-IP-Address"] = nas_ip
    req.id = random.randint(0, 255)
    try:
        reply = client.SendPacket(req)
        return reply.code == pyrad.packet.DisconnectACK
    except Exception as e:
        return False
