<template>
    <div class="fullpage">

        <askew-text-sidebar></askew-text-sidebar>

            <div class="right-content links" style="">
                
                <router-link to="/login" class="link">
                    <span class="number">001.</span>
                    <span v-if="!userContent" class="uppercase">Login</span>
                    <span v-else class="username">{{userName}}</span>
                    <span class="information"> 
                        Du är <span v-if="!userContent" class="warning">inte</span> inloggad.<br />
                        Du visar <span v-if="!watchid" style="text-decoration: underlin_" class="warning">inte</span> din position.
                    </span>
                </router-link>

                

                <router-link to="/map" class="link">
                    <span class="number">002.</span>
                    <span class="name uppercase">Kartan</span>
                    <span class="information">Online:  
                        <span v-if="!onlineUsers">Ingen</span>
                        <span v-for="user in onlineUsers" :key="user" style="text-transform: capitalize; padding-right: 10px;">{{user}}</span>
                    </span>
                </router-link>

                <router-link to="/chatt" class="link">
                    <span class="number">002.</span>
                    <span class="uppercase">
                        Chatt
                    </span>
                    <span class="information" v-if="chattLatest">
                        Senaste meddelande: {{chattLatest.date}} av {{chattLatest.namn}}
                    </span>
                    <!--span class="information" v-if="chattLatest" style="background: red;">
                        <p style="text-overflow: ellipsis; max-width: 100%;white-space: nowrap;overflow: hidden;color: inherit;">
                            Senaste meddelande: {{chattLatest.date}} av {{chattLatest.namn}}
                        </p>
                    </span-->
                </router-link>

                <askew-login-form 
                        :open="userOpen"
                        @close="closeUser"
                        @logout="logoutUser" 
                        @login="loginUser"
                        @changeTrainers="changeTrainers" 
                        :auth="userContent" 
                        :form="userForm"
                        :name="userName"
                        
                        :shoes="userTrainers"></askew-login-form>
            </div>
        
        <!--router-link to="/" style="color:aliceblue; font-size: 12vw;" class="uppercase">Askew</router-link>

        <router-link to="/map">
            <div class="uppercase linkbox">
                <span class="number">001.</span>
                <span class="name">Kartan</span>
                <span class="information">
                    <div>Online:</div> 
                    <div v-if="!onlineUsers">Ingen</div>
                    
                    <div v-for="user in onlineUsers" :key="user" style="text-transform: capitalize; padding-right: 10px;">
                        {{user}}
                    </div>
                </span>
            </div>
        </router-link>

        <router-link to="/chatt">
            <div class="uppercase linkbox">
                <span class="number">002.</span>Chatt
            </div>
            <div v-if="chattLatest" class="small">
                 <span style="text-overflow: ellipsis;max-width: 100%;white-space: nowrap;overflow: hidden;color: inherit;">
                    Senaste meddelande: {{chattLatest.date}} av {{chattLatest.namn}}</span>
            </div>
        </router-link>
        
        <a href="" @click.prevent="toggle">
            <div class="uppercase">
                <span class="number">003.</span>
                <span v-if="!userContent">Login</span>
                <span v-else style="text-transform:capitalize">{{userName}}</span>
            </div>
            <div class="small">
                <div>Du är <span v-if="!userContent" class="warning">INTE</span> inloggad</div>
                <div>Du visar <span v-if="!watchid">INTE</span> din position</div>
            </div>
        </a-->

        <!--askew-line>
            <span style="font-size: 12vw;font-weight: bold;color: var(--white);">ASKEW</span>
            <askew-logo :open="true"></askew-logo> 
            
        </askew-line>

        <router-link to="map">
            <askew-line>
                <div class="link-number">001.</div>
                <div class="link-name">Kartan </div>
                <div class="link-info" style="border-left: 1px dotted black;padding-left: 10px;">
                    <div>Antal personer online</div>
                    <div>Jocke och några till.</div>
                </div>
            </askew-line>
        </router-link>

        <askew-line>
                <span style="opacity: .5;">002. </span> 
             
                <span>Kartan</span>
             
                <span v-if="onlineUsers.length > 0" style="font-size: 10px; color: black;">
                    
                    <span>Just nu är {{onlineUsers.length}} inloggade </span>
                    <div>
                        <span v-for="user in onlineUsers" :key="user" style="padding-right: 10px;">
                            {{user}}
                        </span>
                                    
                        </div>
                </span>
        </askew-line>

        <askew-line>
            
            <router-link to="chatt" class="main"> 003. CHATT  </router-link> 

            <template v-if="chattLatest">
                <p style="text-overflow: ellipsis;max-width: 100%;white-space: nowrap;overflow: hidden;color: inherit;">
                    Senaste meddelande: {{chattLatest.date}} {{chattLatest.namn}}</p>
            </template>
    
            <template v-else>
                <p>Hoppsan, hittar inget chatt meddelande..</p>
            </template>
            
        </askew-line>
    
    <askew-line>004. Om dig  </askew-line-->

    <!--div style="height: 10vw"></div>
    <h1>WE ARE</h1>

    <div class="tunnel">
        <div class="item">Awsome</div>
        <div class="item">Extraordinary</div>
        <div class="item">Staggering</div>
        <div class="item">Breathtaking</div>
        <div class="item">Sublime</div> 
        <div class="item">Phenomenal</div> 
        <div class="item">Unbelivable</div> 
        <div class="item">Magnificent</div> 
        <div class="item">Crazy</div> 
        <div class="item">Wonderful</div> 
        <div class="item">Impressive</div> 
        <div class="item">a n d</div> 
        <div class="item">Out of this world</div>
        <div class="item">WE ARE</div> 
        
        <h1 class="askew">ASKEW</h1>       
    </div-->
    <!--img alt="welcome" src="../assets/img/welcome.jpg" />
<img alt="askew logo" src="../assets/img/monkey_white.svg" /-->
    
<!--svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 8000 1000"
   height="600px"
   width="600px"
   xml:space="preserve"
   id="svg2"
   version="1.1"><metadata
     id="metadata8"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs
     id="defs6"></defs><g
     transform="matrix(1,0,0,-1,-3000,3300)"
     id="g10"><g
       transform="scale(1)"
       id="g12"><g
         id="g24"><g
           clip-path="url(#clipPath30)"
           id="g26"><path
             id="path32"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 9316.12,3811.07 c -6.65,-46.57 -56.83,-49.9 -87.62,-72.49 21.8,-192.83 -203.12,-270.42 -219.06,-507.4 -269.02,-80.89 -567.71,-132.3 -788.6,-260.96 -72.58,0.43 -160.29,-14.14 -175.23,43.5 -83.63,-28.15 -157.59,-65.86 -160.65,-173.97 112.58,-76.75 337.29,-16.55 438.11,-72.48 -26.92,-120.35 -203.61,-38.89 -292.07,-72.48 52.25,-126.93 258.69,-100.8 219.05,-318.94 130.71,20.04 61.99,238.07 204.46,246.45 13.55,-143.19 -58.18,-314.19 -43.82,-434.93 78.31,-62.4 261.4,-20.77 292.08,-130.45 167.82,15.35 317.9,-95.46 379.68,-231.97 -107.17,4.75 -118.46,104.69 -233.65,101.48 -54.76,-42.29 6.9,-200.16 -116.82,-173.96 -2.77,97.92 13.21,89.78 14.59,173.96 -81.89,-53.27 -164.52,-152.72 -146.03,-260.95 -120.22,55.59 -20.68,303.55 -175.24,318.94 -72.56,7.22 -154.11,-66.48 -116.84,-188.47 -148.13,22.07 -145.35,193.98 -175.24,333.45 -54.26,-29.63 -91.77,5.05 -146.04,14.49 -6.49,74.11 -7.47,142.73 58.43,144.98 -32.91,49.46 -68.68,96.13 -146.05,101.47 -58.79,-98.24 74.69,-214.76 14.61,-376.92 -135.05,-59.23 -199.62,-188.44 -365.1,-217.47 -37.43,-78.8 -55.36,-176.99 -131.42,-217.46 11.56,-85.16 44.25,-149.34 87.62,-202.95 195.98,-8.41 308.54,-99.63 321.28,-289.95 18.73,-24.89 58.29,-29.11 73.01,-57.98 -42.56,-86.465 -95.52,-87.215 -175.24,-43.489 -149.38,-70.297 -118.74,-434.152 116.83,-376.93 -0.25,-57.73 -13.97,-102.105 -43.8,-130.48 -76.31,-18.141 -205.46,47.414 -262.88,-14.488 -16.36,-64.575 44.85,-52.133 73.01,-72.496 -145.76,-86.754 -326.29,40.05 -292.07,188.476 -15.35,37.902 -59.32,47.402 -116.82,43.485 -62.15,-12.579 -22.6,-93.899 -43.82,-115.969 -218.97,40.98 -119.98,379.222 116.84,333.422 23.58,103.824 37.24,164.679 73.02,275.449 -81.63,185.36 -208.37,3.05 -292.08,0 -90.32,-3.3 -223.78,148.66 -248.25,231.95 -50.3,171.22 7.9,448.14 -29.2,666.88 -33.83,199.24 -126.93,355.58 -219.06,449.41 -106.69,-12.27 -22.57,-123.99 -43.82,-217.46 -77.81,6.05 -168.8,71.01 -175.25,-43.49 -53.32,0.22 -65.58,41.2 -102.21,57.99 -39.18,-14.28 -15.18,-91.24 -43.82,-115.98 -151.17,147.74 -409.49,424.98 -131.44,594.38 47.86,-29.81 32.32,-122.56 58.43,-173.97 98.28,-6.19 93.25,136.08 189.84,86.99 62.31,44.46 50.34,162.64 146.02,173.98 5.4,-80.23 -2.75,-96.04 43.82,-144.98 47.02,-3.2 61.81,25.64 116.82,14.5 29.7,-38.19 50.2,-85.49 73.03,-130.49 50.21,-6.34 81.84,5.73 116.84,14.5 -4.91,-53.2 22.43,-74.38 58.41,-86.98 82.98,4.6 126.8,48.09 131.42,130.48 70.19,6.84 32.06,-93.83 102.24,-86.98 82.81,19.27 79.81,123.71 87.63,217.45 67.21,-47.84 -13.52,-156.17 58.41,-202.97 96.01,35.67 121.66,113.83 116.82,217.47 52.95,-10.27 62.5,-63.59 146.04,-43.5 44.44,90.93 -80.39,104.28 -73.02,202.96 168.25,-103.5 232.24,80.56 233.66,231.95 61.39,-11.53 69.3,-76.17 160.64,-57.98 29.72,13.98 31.54,55.67 29.2,101.48 55.27,22.46 122.66,32.87 146.04,86.99 -5.74,76.45 -61.68,103.07 -87.62,159.46 301.46,174.31 847.89,34.75 1095.27,275.45 -19,138.85 -24.44,202.69 -14.61,362.43 -45.54,-41.76 -71.96,-102.53 -87.61,-173.97 -73.4,4.46 -172.63,-16.73 -204.45,28.99 41.38,270.22 263.25,431.76 248.26,710.36 33.96,141.34 170.93,254.09 116.83,434.92 -66.26,7.8 -87.48,-29.13 -131.44,-43.49 -112.87,37.75 -151.03,149.67 -262.87,188.46 52.91,172.42 145.5,-3.69 277.48,43.49 142.97,51.12 64.98,257.2 -58.41,275.45 -131.66,19.47 -141.58,-123.25 -321.28,-86.99 16.09,80.68 98.87,95.15 116.82,173.97 -109.93,87.95 -210.52,-142.88 -350.49,-72.48 171.25,417.16 794.33,196.15 949.24,-86.98 -12.86,-106.76 81.27,-200.83 131.43,-289.95 -78.13,-436.35 -113.74,-899.03 -102.22,-1377.22" /><path
             id="path34"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 7242.41,4448.93 c 36.55,-1.8 45.71,-27.66 58.41,14.5 -29.02,0.19 -18.57,39.56 -58.41,29 0,-14.5 0,-29 0,-43.5 z m -29.21,217.46 c -4.52,-33.88 -28.6,-59.89 0,-86.98 105.94,38.25 183.25,11.95 248.25,-57.98 -31.4,-41.31 -106.43,-39.33 -131.42,-86.98 14.36,-49.05 64.79,-70.93 58.41,-101.49 -100.3,-50.9 -114.16,108.72 -219.05,101.49 -54.05,10.14 -36.44,-50.83 -58.43,-72.5 -74.67,36.06 -275.87,115.75 -306.66,-14.5 -72.84,59.96 -246.06,91.61 -350.51,72.48 42.22,-85.01 -18.62,-155.11 -87.6,-173.95 -6.72,75.48 -74.73,90.13 -102.23,144.97 23.19,78.47 134.74,69.2 131.44,173.96 90.71,-7.9 124.99,40.22 146.03,101.48 224.92,-110.26 447.99,26.29 671.77,0" /><path
             id="path36"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 7651.3,4332.96 c -44.96,-10.8 -28.05,39.8 -73.01,28.99 -53,-13.16 -8.9,-42.79 -14.61,-86.97 -31.29,-17.26 -81.6,-15.66 -102.23,-43.5 -10.54,-44.3 14.94,-52.83 14.6,-86.98 -141.6,-19.03 -77.18,157.98 -58.4,275.43 101.66,48.77 241.83,-1.32 233.65,-86.97" /><path
             id="path38"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 7213.2,4101 c -22.36,21.05 24.51,121.78 -14.61,159.47 -143.82,6.76 -212.4,-145.16 -365.09,-101.47 -57.57,3.98 -44.66,-61.99 -102.22,-58 -29.33,29.57 6.46,28.44 14.59,58 -30.25,72.43 -146.59,35.39 -204.44,14.5 -25.02,-73.4 68.08,-73.14 29.21,-115.98 -44.64,10.46 -53.23,-14.84 -87.62,-14.5 -42.05,27.39 -34.03,126.81 -14.61,173.96 138.55,41.17 237.48,70.49 394.3,29 74.67,73.49 330.6,116.34 408.9,14.49 -1.98,-70.52 18,-162.83 -58.41,-159.47" /><path
             id="path40"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 7709.73,4260.47 c 29.85,-105.66 57.79,-213.23 175.23,-231.95 15.37,-53.92 -49.25,-28.43 -58.41,-57.99 127.27,-91.12 228.37,-208.2 423.5,-231.95 -70.59,-119.19 -250.37,-22.18 -335.88,14.49 -18.4,-34.89 -29.48,-77.04 -58.42,-101.48 -94.39,56.1 -179.25,121.68 -277.46,173.97 -3.41,73.94 11.67,166.23 -73.02,159.47 -2.78,132.7 186.98,97.7 116.82,202.95 -27.01,-2.17 -8.95,-49.08 -29.2,-57.98 -83.25,62.21 35,139.33 116.84,130.47" /><path
             id="path42"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 6906.51,4086.51 c 77.63,4.57 138,-7.98 146.04,-72.49 -49.45,4.07 -83.85,23.05 -146.04,14.5 0,19.33 0,38.66 0,57.99" /><path
             id="path44"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 6862.71,4072.02 c -10.71,-53.37 -79.6,-105.98 -116.84,-86.99 -30.63,48.4 38.45,100.81 116.84,86.99" /><path
             id="path46"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 7884.96,3593.6 c -46.73,-50.25 -92.41,-101.56 -116.83,-173.97 -57.2,-8.45 -37.29,59.64 -73.02,72.49 -65.48,7.03 -16.72,-99.37 -87.63,-86.98 -8.84,44.37 -31,75.53 -43.8,115.98 -114.01,-51.12 -86.88,-242.37 -160.64,-333.44 -139.67,21.46 -226.64,-392.72 -394.3,-202.95 -54.99,-3.39 -61.82,-54.6 -116.82,-58 -121.86,57.84 -204.34,154.77 -321.28,217.46 -21.78,108.59 41.11,133.15 73.02,188.46 86.61,-87.99 194.91,-154.44 262.85,-260.94 151.24,70.15 325.79,40.64 321.29,275.44 34.8,39.78 64.38,0.69 102.23,43.5 -4.72,164.03 60.51,396.65 -116.83,420.42 -23.76,129.88 54.64,158.38 102.21,217.45 65.3,-17.34 85.62,-79.31 146.04,-101.47 37.66,-213.92 209.26,-294.85 423.51,-333.45" /><path
             id="path48"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 8892.62,3695.08 c -132.55,1.1 -266.28,3.38 -379.7,-14.5 -1.63,68.28 120.12,48.79 204.44,101.49 67.14,41.95 88.98,131.27 131.44,115.98 66.34,-23.89 77.18,-88.59 43.82,-202.97" /><path
             id="path50"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 6220.14,3492.12 c -8.97,-97.4 -90.44,-122.84 -116.82,-202.95 63.27,-38.67 212.36,7.84 277.46,-29 -14.66,-86.92 32.21,-234.93 -29.2,-275.44 -66.87,-13.23 -41.7,64.91 -73.02,86.98 -44.8,-57.01 -33.79,-169.42 -58.42,-246.44 -177.45,11.84 -332,0.96 -408.9,-87 -253.03,-67.61 -386.55,113.89 -569.54,57.98 -164.26,-50.17 -337.18,-204.82 -452.71,-347.92 74.47,-67.88 68.03,-197.45 0,-289.94 71.64,-94.41 134.12,-167.75 277.46,-159.47 4.25,-81.53 -25.62,-129.2 -73.02,-159.47 -79.42,-16.04 -76.96,49.24 -146.02,43.49 -2.84,-118.8 57.54,-174.83 131.43,-217.46 108.5,3.45 87.29,135.63 175.25,159.47 82.95,0.21 32.24,-132.29 87.61,-159.47 80.69,16.55 8.95,184.41 87.62,202.96 87.76,-43.97 64.44,-223.53 58.41,-318.94 -187.94,-234.57 -626.49,-89.77 -847,14.5 -68.11,154.68 -179.12,266.77 -146.04,521.9 4.01,52.3 -57.74,39.33 -58.42,86.99 7.32,103.88 31.93,190.6 102.23,231.95 18.66,232.76 91.61,411.62 116.83,637.87 288.44,127.72 601.35,174.68 905.42,260.95 244.15,69.26 464.02,299.52 759.39,188.46" /><path
             id="path52"
             style="fill:#39ad73;fill-opacity:1;fill-rule:evenodd;stroke:none"
             d="m 6059.5,4303.96 c 115.8,-66.11 398.98,-141.05 262.88,-318.93 41.59,-62.12 62.76,-186.08 116.82,-188.46 47.84,-2.12 91.32,192.79 219.05,101.48 10.06,-58.3 -13.98,-82.76 -14.59,-130.48 93.4,-101.93 188.07,-6.83 292.07,-28.99 35.37,8.37 32.47,54.74 43.81,86.98 25.51,-13.34 32.22,-45.33 29.2,-86.98 41.28,-11.98 37.83,20.43 73.01,14.49 3.81,-44.54 31.7,-65.2 43.82,-101.48 41.37,12.11 17.36,89.08 43.82,115.98 160.24,-116.81 -40.59,-356.76 -116.84,-463.91 -60.85,61.26 -133.03,-26.65 -189.84,-14.49 -6.36,53.79 -16.98,84.02 -29.21,159.46 -30.55,-13.16 -44.52,-42.78 -43.81,-86.98 -40.95,84.99 -103.28,148.76 -175.26,202.95 -63.07,-9.85 8.01,-152.9 -87.61,-130.47 -11.27,-69.17 22.85,-93.3 14.61,-159.46 -100.96,15.76 -145.48,87.53 -204.46,144.96 42.05,64.58 52.37,160.66 43.81,275.45 -87.05,-10.22 -104.07,-89.97 -175.24,-115.97 -102.08,71.87 -224.64,55.98 -335.88,57.99 36.15,157.4 246.59,141.8 306.68,275.44 -7.59,35.96 -35.61,51.64 -58.41,72.49 5.02,38.5 38.33,48.93 73.01,57.99 -2.98,45.36 9.84,106.43 -14.6,130.48 -123.08,30.36 -77.16,-107.04 -189.86,-86.99 -51.62,94.52 43.73,156.19 73.02,217.45" /></g></g></g></g></svg-->

    <!--img alt="Vue logo" src="../assets/logo.png"-->
    
    
    
    <!--HelloWorld msg="Välkommen" :users="onlineUsers" :venue="venueActive" :chatt="chattLatest" /-->
   
   
   <!--p style="color: pink">
     {{chattLatest}}
   </p-->
  </div>
</template>

<script setup>
// @ is an alias to /src  
import HelloWorld from '@/components/HelloWorld.vue'
import { onMounted, computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import AskewLine from '../components/AskewLine.vue'
import AskewLogo from '../components/AskewLogo.vue'
import AskewLoginForm from '../components/AskewLoginForm.vue'
import AskewTextSidebar from '../components/AskewTextSidebar.vue'

//import {defineEmits} from 'vue'

let animation = null
const store = useStore();

const onlineUsers = computed(() => store.getters['positions/users'])
const venueActive = computed(() => store.getters['venues/active'])
const chattLatest = computed(() => store.getters['chatt/latest'])
// User
const userContent = computed(()=> store.getters['user/content'])
const userLoading = computed(()=> store.getters['user/loading'])
const userName = computed(()=> store.getters['user/name'])
const userOpen = computed(() => store.getters['user/open'])

// Geolocation
const watchid = computed(() => store.getters['geolocation/watchid'])

//const emit = defineEmits(['toggle'])

// For login
const userForm = computed(()=> store.getters['user/form'])
    const userTrainers = computed(()=> store.getters['user/trainers'])
    

function toggle () {
    store.commit('user/OPEN') 
}

function closeUser () {
        store.commit('user/CLOSE'); 
}

function logoutUser () {
    store.dispatch('user/logout'); 
}

function loginUser () {
    store.dispatch('user/signIn'); 
}

function changeTrainers (name) {
    store.dispatch('user/changeTrainers', name); 
}

onMounted(() => {
    
    let tl = gsap.timeline();
    
    /*t1.to(".link", {
        y: 0, 
        stagger: 0.1
      
    }, 1)*/

    tl.fromTo(".link", {scale: 0.9, x:50}, {duration: .2, scale: 1, x: 0,stagger: 0.2}, .1);
})

/*function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}*/

</script>

<style scoped>
.links {
    flex:1;
    display: flex;
    flex-direction: column;
    padding: var(--padding) var(--padding) var(--padding) 0
}
.tunnel {
    position: relative;
    background: transparent;
    width: 100%;
    text-align: center;
    height: 100px;
}

.item {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    opacity: 0;
    text-align: center;
}
.askew { opacity: 0; text-align: center;}

svg { fill: red}


.link-number {
    opacity: .5;
    margin-right: 10px;
}

.link-name {
margin-right: 10px;
}

.link-info {
    font-size: 20%;
}

a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-top: 12px solid var(--background);
    font-size: 3em;
    color: #252f38;
    background: transparent;
    transition: all .5s ease;
    padding: var(--padding) calc( 3* var(--padding)) 
}

@media only screen and (min-width: 600px) {
    a {
        padding: var(--padding) 8vw;
        font-size: 7vw
    }    
}


a:hover {
    background: #8ed5f3;
    transition: all .5s ease;
}

a:first-child {
    border-top: none;
}






.linkbox {
    display: flex;
    justify-content: flex-start;
    align-items: bottom;
}    

.links > *:first-child {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    z-index: 200;
}

.links > *:nth-child(3),
.links > *:last-child {
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
}

.link {
    background: var(--content-background)
}

.number,
.information {
    font-size: 1rem;
    line-height: 1.4rem;
    margin: 0;
    padding: var(--padding) 0 var(--padding) 2px;
    letter-spacing: 0px;
    color: #252f38;
}

.number {
    letter-spacing: 1px;
}

.uppercase {
    text-transform: uppercase;
    font-weight: bold;
    line-height: 5vw;
}

.username {
    text-transform: capitalize; 
    font-weight: bold;
    line-height: 5vw;
}
</style>
