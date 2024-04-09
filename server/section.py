from bs4 import BeautifulSoup
import requests

def parse_soup(soup : BeautifulSoup) -> dict:
  all_fields = soup.find_all('td', class_='dddefault')

  if len(all_fields) == 0:
    return {}
  
  static_headers = soup.find('div', class_='staticheaders').text
  term = static_headers.split('\n')[1]
  full_course_name = soup.find('th', class_='ddlabel').text
  split_name = full_course_name.split(' - ')

  return {
      'seats' : {
        'actual' : int(all_fields[2].text),
        'capacity' : int(all_fields[1].text),
        'remaining' : int(all_fields[3].text)
      },
      'crn' : int(split_name[1]),
      'title' : split_name[0],
      'course' : split_name[2],
      'section' : int(split_name[3]),
      'term' : term
  }

def scrape_section(term, crn) -> dict:
  url = f'https://compass-ssb.tamu.edu/pls/PROD/bwykschd.p_disp_detail_sched?term_in={term}&crn_in={crn}'
  print(url)

  try:
    page = requests.get(url)
    page.raise_for_status()
  except requests.HTTPError as e:
    return {}

  if page.status_code != 200:
    return {}
  
  soup = BeautifulSoup(page.text, 'html.parser')
  course_info = parse_soup(soup)
  return course_info
  