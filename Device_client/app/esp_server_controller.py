from os import stat
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time


chrome_options  = webdriver.ChromeOptions()
chrome_options .add_argument("--headless") #Note this line keeps browser from opening
chrome_options .add_argument("--no-sandbox")
chrome_options .add_argument("--disable-dev-shm-usage")
chrome_prefs = {}
chrome_options.experimental_options["prefs"] = chrome_prefs
chrome_prefs["profile.default_content_settings"] = {"images": 2}

driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)

def turn_pump_on(pump, duration):
    pass

""" Gets the temperature of the water in the reservoir """
def getWaterTemp():
    try:
        driver.get("http://192.168.0.214/")
        waterTemp = driver.find_element_by_xpath("//*[@id='temperaturef3']")
        waterTemp = waterTemp.text
    except:
        waterTemp = "000"
    return waterTemp

""" Gets the temperature of the grow tent """
def getGrowRoomTemp():
    try:
        driver.get("http://192.168.0.214/")
        roomTemp = driver.find_element_by_xpath("//*[@id='temperaturef1']")
        roomTemp = roomTemp.text
    except:
        roomTemp = "000"
    return roomTemp

""" Gets the temperature of the area surrounding the grow tent """
def getSurroundingAreaTemp():
    try:
        driver.get("http://192.168.0.214/")
        areaTemp = driver.find_element_by_xpath("//*[@id='temperaturef2']")
        areaTemp = areaTemp.text
    except:
        areaTemp = "000"
    return areaTemp

# """ Logs in to the Homebridge Interface  """
# def loginToHomebridge():
#     driver.get("http://localhost:8581/accessories")
#     time.sleep(.5)        
#     driver.find_element(By.ID,"form-username").send_keys('admin')
#     driver.find_element(By.ID,"form-pass").send_keys('admin')
#     driver.find_element(By.XPATH, "/html/body/app-root/app-login/div/div/form/div[2]/button").click()
#     time.sleep(.5)

# """ Gets the state of the Exhaust fan (on/off) """
# def getExhaustFanstatus():
#     loginToHomebridge()
#     status = driver.find_element(By.XPATH,"/html/body/app-root/app-layout/div/div/app-accessories/div/div[2]/div/div[2]/div/div[1]/app-accessory-tile/app-outlet/div/div/div[3]").get_attribute("innerHTML")
#     return status

# """ Gets the state of the Oscillating fan (on/off) """
# def getFanStatus():
#     pass

# """ Turns the Grow Tent Exhaust Fan On"""
# def turnOnExhaustFan():
#     loginToHomebridge()
#     driver.find_element(By.XPATH,"/html/body/app-root/app-layout/div/div/app-accessories/div/div[2]/div/div[2]/div/div[1]/app-accessory-tile/app-outlet/div/div/div[1]").click()
    
#     """ Turns the Grow Tent Exhaust Fan Off"""
# def turnOffExhaustFan():
#     loginToHomebridge()
#     driver.find_element(By.XPATH,"/html/body/app-root/app-layout/div/div/app-accessories/div/div[2]/div/div[2]/div/div[1]/app-accessory-tile/app-outlet/div/div/div[1]").click()