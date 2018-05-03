from os import listdir
from os.path import isfile, join
mypath = '.'
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
for i in onlyfiles:
	print('"%s": "%s",' %(i[-7:-4].upper().replace("-", ""), i.replace('#', "%23")))
