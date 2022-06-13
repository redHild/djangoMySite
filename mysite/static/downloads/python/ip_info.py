import math
import subprocess
import pyspeedtest as pst

# ---------------------------------------------------------------------
try:
    res = subprocess.check_output(["netsh", "wlan", "show", "networks"]).decode("ascii").replace("\r","").split("\n")[4:]
    ssids = []
    for item in res:
        if 'SSID' in item:
            ssids.append(item.split(" : ")[1])
    # ---------------------------------------------------------------------
    print('----------------- ALL CONNECTIONS  -------------------------')
    for ssid in ssids:
        try:
            res = subprocess.check_output(["netsh", "wlan", "show", "profile", "name={}".format(ssid), "key=clear"]).decode("ascii").replace("\r","")
            print('------------------- CONNECTED TO ---------------------------\n{}\n------------------------------------------------------------'.format('SSID  :  {}'.format(ssid)))
        except:
            print('SSID  :  {}'.format(ssid))
    print('------------------------------------------------------------')
    # ---------------------------------------------------------------------
    ls = res.split('\n')
    res = ""
    for line in ls:
        if 'Key Content' in line:
            res += line + " - (WIFI PASSWORD)\n"
        else:
            res += line + "\n"
    print(res)
    # ---------------------------------------------------------------------
    print('---------- Speed Test to 1.0.0.1 ----------')
    try:
        ls = subprocess.check_output(["ping", '-n', '20', '-l', '512', '1.0.0.1']).decode("ascii").replace("\r","").split("\n")
        pingData = []
        spdData = []
        for row in ls:
            if 'Reply from 1.0.0.1:' in row:
                pingData.append(float(row.split(" ")[4].split("=")[1].replace("ms","") + ".0"))
        pingMin = 99999.0
        pingMax = -1.0
        pingAvg = 0.0
        spdMin = 9999.0
        spdMax = -1.0
        spdAvg = 0
        for ping in pingData:
            if pingMin > ping:
                pingMin = ping
            if pingMax < ping:
                 pingMax = ping
            pingAvg += ping
            # ---------------------------------------------------------------------------------------------------------
            spd = ((512 / ping) * 1000) / math.pow(2,10)
            if spdMin > spd:
                spdMin = spd
            if spdMax < spd:
                 spdMax = spd
            spdAvg += spd
        pingAvg = pingAvg / len(pingData)
        spdAvg = spdAvg / len(pingData)
        print('PING SPEED\nMin Ping: {}ms\nMax Ping: {}ms\n\nAverage Ping: {}ms'.format(pingMin,pingMax,pingAvg))
        print('---------------------------------------------')
        print('MEGABYTE SPEED\nMin Speed: {} MB/s\nMax Speed: {} MB/s\n\nAverage Speed: {} MB/s'.format(spdMin,spdMax,spdAvg))
    except:
        print('SPEED TEST SYSTEM IS NOT WORKING AT THE MOMENT - THANK YOU\n')
except:
    print('NOT CONNECTED PROPERLY TO A NETWORK')
# ---------------------------------------------------------------------
print('-------- TESTING COMPLETE --------\n')
print("\nPRESS ENTER TO CONTINUE...")
i = input()



