## Konzeptionell → Logisch
#### 1. Copy & Paste vom PlantUML code
#### 2. Anpassung der Namen (z.B. `Customer ID` wird zu `customer_id`)
#### 3. Aufschlüsseln der Beziehungen und Kardinalitäten

- **1 zu n** (normal)
  - *FK* als Attribut bei der *n* Entität setzen
  - von: 
    - `customer "1"--"*" order`
  - zu: 
    - `class orders { customer_id }`
    - `orders --> customers : "customer_id: \n customer_id"`

- **1 zu n** (Sonderfall: schwache Entität)
  - *FK* als Attribut bei der schwachen *n* Entität setzen; dieser wird zu einem *CK*
  - von: 
    - `room "*"-*"1" building`
  - zu: 
    - `class room { building_id <<CK>> }`
    - `room --> building : "building_id: \n building_id"`

- **1 zu 1**
  - *FK* als Attribut bei einer der beiden Entität setzen (egal bei welcher)
  - von: 
    - `person "1"--"1" passport`
  - zu: 
    - `class passport { person_id }`
    - `passport --> person : "person_id: \n person_id"`

- **n zu m**
  - eine weitere Klasse muss erstellt werden
  - diese neue Klasse beinhaltet beide Entitäten der Relationship als *FK* und bildet zusammengesetzt aus diesen ihren *PK* (in diesem Schritt noch als *CK* bezeichnet)
  - von: 
    - `student "*"--"*" course`
  - zu: 
    - `class enrollment { student_id <<CK>> \n course_id <<CK>> }`
    - `enrollment --> student : "student_id: \n student_id"`
    - `enrollment --> course : "course_id: \n course_id"`