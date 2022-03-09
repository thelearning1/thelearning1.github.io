# convert the csv into an html table
import pandas as pd

#read the csv
csv = pd.read_csv('Resources/cities.csv')

#change the date column for legibility
df = pd.DataFrame(csv)


#remove the extraneous columns
df.set_index(['City_ID'],inplace=True)
df.to_csv('Resources/cleaned_cities.csv')

csv = pd.read_csv('Resources/cleaned_cities.csv')

csv.to_html('Resources/table.html',index=False)