import bs4
import json
import os

html_path = 'c:/Users/danni/Documents/UNAD/ruta senior/landing/original_v1/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f, 'html.parser')

data = {
    "phases": [],
    "semesters": []
}

# Extract phases
fase_cards = soup.select('.fases-timeline .fase-card')
for card in fase_cards:
    fase_num = card.select_one('.fase-number').text.strip()
    title = card.select_one('h3').text.strip()
    description = card.select_one('p').text.strip()
    semesters = card.select_one('.fase-semesters').text.strip()
    data["phases"].append({
        "number": fase_num,
        "title": title,
        "description": description,
        "semesters": semesters
    })

# Extract semesters
semester_cards = soup.select('.semester-card')
for card in semester_cards:
    sem_id = card.get('id')
    num = card.select_one('.semester-number').text.strip()
    title = card.select_one('.semester-info h3').text.strip()
    meta = card.select_one('.semester-meta').text.strip()
    
    # Bloque A
    bloque_a_title = card.select_one('.bloque-a h4').text.strip()
    bloque_a_items = [li.text.strip() for li in card.select('.bloque-a ul li')]
    
    # Bloque B
    bloque_b_title = card.select_one('.bloque-b h4').text.strip()
    bloque_b_items = [li.text.strip() for li in card.select('.bloque-b ul li')]
    
    # Bibliography
    biblio = []
    table = card.select_one('.biblio-table')
    if table:
        rows = table.select('tbody tr')
        for row in rows:
            cols = row.select('td')
            if len(cols) >= 4:
                biblio.append({
                    "resource": cols[0].text.strip(),
                    "author": cols[1].text.strip(),
                    "lang": cols[2].text.strip(),
                    "area": cols[3].text.strip()
                })
    
    # Projects
    projects = []
    proj_cards = card.select('.proyecto-card')
    for p_card in proj_cards:
        p_num = p_card.select_one('.proyecto-num').text.strip()
        p_type = p_card.select_one('.proyecto-tipo').text.strip()
        p_title = p_card.select_one('h5').text.strip()
        p_desc = p_card.select_one('p').text.strip()
        p_stack = p_card.select_one('.stack').text.replace('Stack:', '').strip() if p_card.select_one('.stack') else ""
        p_price = p_card.select_one('.precio').text.replace('Potencial:', '').strip() if p_card.select_one('.precio') else ""
        p_connect = p_card.select_one('.conecta').text.replace('Conecta:', '').strip() if p_card.select_one('.conecta') else ""
        
        projects.append({
            "num": p_num,
            "type": p_type,
            "title": p_title,
            "description": p_desc,
            "stack": p_stack,
            "price": p_price,
            "connect": p_connect
        })
    
    data["semesters"].append({
        "id": sem_id,
        "number": num,
        "title": title,
        "meta": meta,
        "bloqueA": {"title": bloque_a_title, "items": bloque_a_items},
        "bloqueB": {"title": bloque_b_title, "items": bloque_b_items},
        "bibliography": biblio,
        "projects": projects
    })

output_path = 'c:/Users/danni/Documents/UNAD/ruta senior/landing/src/data/plan.json'
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Extracted data to {output_path}")
