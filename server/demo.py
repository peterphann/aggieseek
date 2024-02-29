import requests
from bs4 import BeautifulSoup

# Basic demo of how the website is scraped
def scrape(crn : int, term : int):
  url = f'https://compass-ssb.tamu.edu/pls/PROD/bwykschd.p_disp_detail_sched?term_in={term}&crn_in={crn}'
  page = requests.get(url)
  
  
  
  
scrape(36107, 202331)