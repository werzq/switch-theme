"use client"

import { Playfair_Display } from "next/font/google"
import { Editor } from "@monaco-editor/react"
import { useEffect, useRef} from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const playfair = Playfair_Display({ subsets: ["latin"] })

const readableCode = `javascript:( // javascript prefix to use this script as a bookmarklet
  function() {
      // check if the page is currently in dark mode by looking at a custom attribute on the root element
      const isDarkMode = document.documentElement.getAttribute("data-darkmode") === "true";
      
      // function to invert a given RGB color, making light colors dark and vice versa
      function invertColor(color, type) {
          // split the color string to extract its numeric values (e.g., "rgb(255, 255, 255)" -> ["rgb", "255, 255, 255"])
          const parts = color.split("(");
          const values = parts[1].split(")")[0].split(",");
          
          // loop through the first three values (R, G, B), ignore alpha if present
          values.forEach((value, index) => {
              if (index < 3) {
                  // if the type is "color" and the inversion would result in a very light color, force it to be a mid-tone
                  values[index] = type == "color" && 255 - parseInt(value) < 50 ? 120 : 255 - parseInt(value);
              }
          });
          
          // reconstruct the color string with the modified values
          return parts[0] + "(" + values.join(",") + ")";
      }
      
      // function to show a temporary notification on the screen
      function showNotification(message) {
          // create a div element that will hold the notification
          const notification = document.createElement("div");

          // apply styles to position and style the notification as a small overlay at the bottom-right of the screen
          notification.style.cssText = 
              "position:fixed;" +
              "bottom:20px;" + // position 20px from the bottom
              "right:20px;" + // position 20px from the right
              "background:rgba(32,33,36,0.9);" + // semi-transparent dark background
              "color:#fff;" + // white text color
              "padding:8px 12px;" + // some padding for spacing
              "border-radius:3px;" + // rounded corners for a softer look
              "font-size:13px;" + // small text size
              "line-height:1;" + // compact line height
              "z-index:9999;" + // ensure it appears on top of other elements
              "font-family:system-ui;" + // use a generic system font
              "box-shadow:0 2px 4px rgba(0,0,0,0.2);"; // subtle shadow for depth

          // create a text element inside the notification
          const messageText = document.createElement("div");
          messageText.textContent = message;
          messageText.style.marginBottom = "2px";

          const creditText = document.createElement("div");
          creditText.style.cssText = "font-size:8px;opacity:0.6;line-height:1";
          creditText.textContent = "Switch Theme by werzq";

          // create a progress bar that will shrink over time to visually indicate the notification duration
          const progressBar = document.createElement("div");
          progressBar.style.cssText = 
              "position:absolute;" + // position it within the notification
              "bottom:0;" + // attach it to the bottom
              "left:0;" + // align to the left
              "height:1px;" + // very thin bar
              "background:#fff;" + // white progress bar
              "width:100%;" + // full width initially
              "transform-origin:left;" + // shrink from the left side
              "animation:shrink 2s linear forwards;"; // use CSS animation to shrink over 2 seconds

          // create a style element to define the shrinking animation
          const style = document.createElement("style");
          style.textContent = "@keyframes shrink{from{transform:scaleX(1)}to{transform:scaleX(0)}}";
          document.head.appendChild(style); // add the style definition to the document

          // assemble all parts into the notification element
          notification.appendChild(messageText);
          notification.appendChild(creditText);
          notification.appendChild(progressBar);

          // add the notification to the document so it becomes visible
          document.body.appendChild(notification);

          // set a timer to remove the notification and cleanup the added style after 2 seconds
          setTimeout(() => {
              notification.remove();
              style.remove();
          }, 2000);
      }
      
      // check if dark mode is already enabled or not
      if (!isDarkMode) {
          // loop through all elements on the page that haven't been processed yet (marked with "invTouch")
          document.querySelectorAll("*:not([invTouch])").forEach(element => {
              // get the computed styles of the element to read its current colors
              const style = window.getComputedStyle(element);
              
              // invert the background color and text color
              element.style.backgroundColor = invertColor(style.backgroundColor, "back");
              element.style.color = invertColor(style.color, "color");
              
              // mark this element as processed so it's not modified multiple times
              element.setAttribute("invTouch", "true");
          });

          // set the global attribute indicating dark mode is now enabled
          document.documentElement.setAttribute("data-darkmode", "true");

          // show a notification to inform the user that colors have been inverted
          showNotification("Colors Inverted");
      } else {
          // if dark mode is already enabled, restore original colors
          document.querySelectorAll("[invTouch]").forEach(element => {
              // reset background and text colors to their default values
              element.style.backgroundColor = "";
              element.style.color = "";

              // remove the attribute indicating this element was modified
              element.removeAttribute("invTouch");
          });

          // update the global attribute to indicate dark mode is now disabled
          document.documentElement.setAttribute("data-darkmode", "false");

          // show a notification to inform the user that colors have been restored
          showNotification("Colors Restored");
      }
  }
)();`

const minifiedCode = `javascript:(function(){const d=document.documentElement.getAttribute("data-darkmode")==="true";function i(c,t){const p=c.split("("),v=p[1].split(")")[0].split(",");v.forEach((x,i)=>i<3&&(v[i]=t=="color"&&255-parseInt(x)<50?120:255-parseInt(x)));return p[0]+"("+v.join(",")+")"}function n(m){const o=document.createElement("div");o.style.cssText="position:fixed;bottom:20px;right:20px;background:rgba(32,33,36,0.9);color:#fff;padding:8px 12px;border-radius:3px;font-size:13px;line-height:1;z-index:9999;font-family:system-ui;box-shadow:0 2px 4px rgba(0,0,0,0.2)";const t=document.createElement("div");t.textContent=m;t.style.marginBottom="2px";const c=document.createElement("div");c.style.cssText="font-size:8px;opacity:0.6;line-height:1";c.textContent="Switch Theme by werzq";const p=document.createElement("div");p.style.cssText="position:absolute;bottom:0;left:0;height:1px;background:#fff;width:100%;transform-origin:left;animation:shrink 2s linear forwards";const s=document.createElement("style");s.textContent="@keyframes shrink{from{transform:scaleX(1)}to{transform:scaleX(0)}}";document.head.appendChild(s);o.appendChild(t);o.appendChild(c);o.appendChild(p);document.body.appendChild(o);setTimeout(()=>{o.remove();s.remove()},2000)}if(!d){document.querySelectorAll("*:not([invTouch])").forEach(e=>{const s=window.getComputedStyle(e);e.style.backgroundColor=i(s.backgroundColor,"back");e.style.color=i(s.color,"color");e.setAttribute("invTouch","true")});document.documentElement.setAttribute("data-darkmode","true");n("Colors Inverted")}else{document.querySelectorAll("[invTouch]").forEach(e=>{e.style.backgroundColor="";e.style.color="";e.removeAttribute("invTouch")});document.documentElement.setAttribute("data-darkmode","false");n("Colors Restored")}})();`

export default function BookmarkletPage() {
  const bookmarkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (bookmarkRef.current) {
      bookmarkRef.current.href = minifiedCode
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></motion.div>
      <div className="relative h-full">
        <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          {/* Hero Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center space-y-6 flex-shrink-0 pt-16"
          >
            <div className="relative inline-flex flex-col items-end">
              <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900`}>
                Switch Theme
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                by <a href="https://werzq.cc" target="_blank" className="hover:text-black hover: cursor-pointer" rel="noreferrer">werzq.cc</a>
              </p>
            </div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Transform any website between light and dark mode with a single click. Just drag the button below to your
              bookmarks bar to get started.
            </p>
          </motion.div>

          {/* Bookmarklet Button */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center my-12"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <motion.a
                ref={bookmarkRef}
                title="Switch Theme"
                className="relative px-7 py-4 bg-white rounded-lg leading-none flex items-center hover:bg-gray-50 transition duration-200 cursor-move space-x-3"
                draggable="true"
                onClick={(event) => event.preventDefault()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/favicon.ico" alt="Switch Theme" className="w-6 h-6" draggable="false" width={24} height={24}/>
                <span className="text-gray-900 text-lg font-semibold">Switch Theme</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Code Editor */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="relative flex-1 min-h-0 mb-8"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25"></div>
            <div className="relative h-full bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-2 text-sm text-gray-600 font-medium">
                  Switch Theme - Unminified Source Code
                </span>
              </div>
              <div className="h-[calc(100%-40px)]">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  defaultValue={readableCode}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "off",
                    padding: { top: 20 },
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

