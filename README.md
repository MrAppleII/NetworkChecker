# NetworkChecker
NetworkChecker navigates the user to the passed urls when the browser goes offline or online. It relies first on the JavaScript API for checking but it also has a fallback polling function incase the browser does not  support that API. 

# Props

| Prop Name | DEFAULTS | Description |
| --- | --- | --- |
| ` timeout:` | 5000 |  How long to wait for a response from the polling test. Only used in the fallback method. |
| `interval:` |  5000 |  How often to check if using the polling test. |
| `offlineUrl:` | "" | The url Gatsby will navigate to when offline. Ex: offlineUrl="/about" will go to"www.mysite.com/about"|
| `onlineUrl:` | "/" |  The url Gatsby will navigate to when online. Ex: onlineUrl="/about" will go to "www.mysite.com/about"|
| `pollingUrl:` | "wwww.google.com" | Where to ping to check if the internet is there. |
| `callUponOffline:` | None | This function runs when the user goes offline before gatsby does the navigation. |
| `callUponOnline:` | None |This function runs when the user goes online before gatsby does the navigation. |


