from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time


chrome_options  = webdriver.ChromeOptions()
# chrome_options .add_argument("--headless") #Note this line keeps browser from opening
# chrome_options .add_argument("--no-sandbox")
# chrome_options .add_argument("--disable-dev-shm-usage")
# chrome_prefs = {}
# chrome_options.experimental_options["prefs"] = chrome_prefs
# chrome_prefs["profile.default_content_settings"] = {"images": 2}

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:8581/accessories")
time.sleep(.5)    
driver.find_element(By.ID,"form-username").send_keys('admin')
driver.find_element(By.ID,"form-pass").send_keys('admin')
driver.find_element(By.XPATH, "/html/body/app-root/app-login/div/div/form/div[2]/button").click()
time.sleep(.5)
driver.find_element(By.XPATH,"/html/body/app-root/app-layout/div/div/app-accessories/div/div[2]/div/div[2]/div/div[1]/app-accessory-tile/app-outlet/div/div/div[1]").click()
# time.sleep(.5)
name = driver.find_element(By.XPATH, "/html/body/app-root/app-layout/div/div/app-accessories/div/div[2]/div/div[2]/div/div[1]/app-accessory-tile/app-outlet/div/div/div[2]").get_attribute("innerHTML")
time.sleep(.5)
status = driver.find_element(By.XPATH,"/html/body/app-root/app-layout/div/div/app-accessories/div/div[2]/div/div[2]/div/div[1]/app-accessory-tile/app-outlet/div/div/div[3]").get_attribute("innerHTML")
print(name, status)