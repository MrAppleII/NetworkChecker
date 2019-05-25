import React, { Component } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

/*
    File: NetworkChecker.js

    Description: NetworkChecker navigates the user to the passed urls when the browser goes offline or online. It relies 
    first on the JavaScript API for checking but it also has a fallback polling function incase the browser does not 
    support that API. 

    PROP NAME   DEFAULTS           Description
    timeout:     5000,             How long to wait for a response from the polling test. Only used in the fallback method.
    interval:    5000,             How often to check if using the polling test.
    offlineUrl:   "",              The url Gatsby will navigate to when offline. Ex: offlineUrl="/about" will go to "www.mysite.com/about"
    onlineUrl:   "/",              The url Gatsby will navigate to when online. Ex: onlineUrl="/about" will go to "www.mysite.com/about"
    pollingUrl: "wwww.google.com", Where to ping to check if the internet is there.
    callUponOffline:function() {}, This function runs when the user goes offline before gatsby does the navigation.
    callUponOnline:function() {},  This function runs when the user goes online before gatsby does the navigation.

*/

// Get typeof navigator
const inBrowser = typeof navigator !== "undefined"
//These are the browser that do not support the handy isOnline event so they require polling.
const unsupportedBrowser = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/

class NetworkChecker extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOnline:
        inBrowser && typeof navigator.onLine === "boolean"
          ? navigator.onLine
          : true,
      enabledPolling: props.polling,
    }
  }

  componentDidMount() {
    // Time to set our props and check for oddities.

    //Create the listeners for the offline online events
    try {
      window.addEventListener("online", this.wentOnline)
      window.addEventListener("offline", this.wentOffline)

      if (this.state.enabledPolling) {
        this.pollConnection()
      }
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
    }
  }

  componentWillUnmount() {
    //Remove the listeners we created.
    try {
      window.removeEventListener("online", this.wentOnline)
      window.removeEventListener("offline", this.wentOffline)
      if(this.state.enabledPolling){
        clearInterval(this.pollingTest);
      }
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
    }
  }

  // These are the methods that are called when an event regarding going offline is called.
  wentOffline = () => {
    if (this.state.isOnline) {
      this.setState({ isOnline: false })
    }
    this.props.callUponOffline()
    navigate(this.props.offlineUrl)
  }
  wentOnline = () => {
    if (!this.state.isOnline) {
      this.setState({ isOnline: true })
    }
    this.props.callUponOffline()
    navigate(this.props.onlineUrl)
  }
  /*
     This is the fallback method if the browser does not support the JS API for online offline browser events. 
     It runs a ping test to the url provided every interval amount. If no response is given after the time set by timeout, 
     it will return that there is no internet. This method on its own runs the two functions created to be run when it goes 
     online and when it goes offline. 
  */
  pollConnection = () => {
    this.pollingTest = setInterval(() => {
      this.connectionTest().then(online => {
        online ? this.wentOnline() : this.wentOffline()
      })
    }, this.props.interval)
  }
  /*
  This is just a generic function that check if it can get a response from the site. Returns a Promise. 
  */
  connectionTest = () => {
    return new Promise(resolve => {
      var isOnline = () => resolve(true)
      var isOffline = () => resolve(false)
      var xhr = new XMLHttpRequest()
      xhr.onerror = isOffline
      xhr.ontimeout = isOffline
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.HEADERS_RECEIVED) {
          if (xhr.status) {
            isOnline()
          } else {
            isOffline()
          }
        }
      }
      xhr.open("HEAD", this.props.url)
      xhr.timeout = this.props.timeout
      xhr.send()
    })
  }
  render() {
    try {
      return null
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}

NetworkChecker.propTypes = {
  children: PropTypes.node,
  pollingUrl: PropTypes.string,
  polling: PropTypes.bool,
  interval: PropTypes.number,
  timout: PropTypes.number,
  callUponOnline: PropTypes.func,
  callUponOffline: PropTypes.func,
  offlineUrl: PropTypes.string,
  onlineUrl: PropTypes.string,
}
// Set the default props that will be used
// Notice we are testing if the browser is supported or else we have to use polling.

NetworkChecker.defaultProps = {
  polling: inBrowser && unsupportedBrowser.test(navigator.userAgent),
  timeout: 5000,
  interval: 5000,
  offlineUrl: "",
  onlineUrl: "/",
  pollingUrl: "wwww.google.com",
  callUponOffline: function() {},
  callUponOnline: function() {},
}
export default NetworkChecker
