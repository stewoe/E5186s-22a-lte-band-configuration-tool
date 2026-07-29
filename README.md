# E5186s-22a-lte-band-configuration-tool
Javascript code that can be executed in the browser console to set LTE bands of the Huawei E5186s-22a router (because bands can't be set from the UI).

# Why would you want to set the LTE band manually?
Normally, the router choses a mix of bands that suits your usecase very well. However, in some regions with lots of traffic on the most popular bands (and limited infrastructure) it can be beneficial to switch to a slower, but less used band. This can lead to higher overall speed. 

This setting is not available in the router's UI, but it is available in the API. The code in this repo can be simply used in the browser to set the band(s) of your choice.

# How to set a band?

1. Navigate to your router's admin UI and login. (The code uses the access token generated during the login)
2. Press F12 in your browser to open the DevConsole
3. In the console, paste the content of [set-band.js](https://github.com/stewoe/E5186s-22a-lte-band-configuration-tool/blob/main/set-band.js)
   **Before hitting Enter**: Change the value of the constant *LTE_BAND* to whatever band you want to set.
5. After hitting enter, allow the router 20-30s to reconnect to the network with the newly configured band. You can perform a speedtest and check if the connection is now slower or faster.

# How to check which band is currently used by the router?

In the browser's DevConsole, after logging into the router's UI, execute the following JS code to get the info: `fetch('/api/net/net-mode').then(r => r.text()).then(console.log);`

# How do I reset the band to the default behavior (=automatically choose from all bands)

Follow the instructions in "How to set a band" and use *const LTE_BAND = ALL;*
Alternatively, you can perform a factor reset.

