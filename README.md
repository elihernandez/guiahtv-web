"# GuiahTv-1.1.0" 

cd C:\Users\Nef Stark\webOS_SDK\SmartTVWorkspace\ 
ares-package -o GuiahTVWebOS GuiahTVWebOS 
ares-install --device emulator GuiahTVWebOS/com.guiahtv.smarttv_1.0.4_all.ipk 
ares-inspect --device emulator --app com.guiahtv.smarttv --open 