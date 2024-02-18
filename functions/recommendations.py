import pandas as pd
import numpy as np  # Needed for converting DataFrame to numpy array
from sklearn.preprocessing import StandardScaler
import sys
import json



def is_float(value):
    if value.replace(".", "").isnumeric():
        return True
    else:
        return False


isTest = False
verbosity = None

if(len(sys.argv)<2 or sys.argv[1] == "-test"):
    isTest = True
    verbosity = 2

if isTest:
    #farmer preferences
    input_data = {
        "type_of_bull": "Angus",
        "backfat_thickness": None,
        "ribeye_area": None,
        "marbling_score": None,
        "dressing_percentage": None,
        "subcutaneous_fat": None,
        "visceral_fat": None,
        "lean_meat_yield": None,
        "residual_average_daily_gain": None,
        "dry_matter_intake": None,
        "yearling_weight": None,
        "working_weight": None,
        "birth_weight": None,
        "calving_ease_direct": 1,
        "yearling_height": None,
        "age_at_collection": None,
        "mature_height": None,
        "mature_weight": None,
        "price_of_semen": None,
        
    }
else:
    input_data = json.loads(sys.argv[1])
# Load bull info data from CSV file into a pandas DataFrame
bull_info_data = pd.read_csv("bull_info.csv")
bull_info_non_dropped_columns = bull_info_data

filtered_input_data = input_data.copy()

for key, value in input_data.items():
    if(isinstance(value, str) and is_float(value)):
        filtered_input_data[key] = float(value)

    if value is None:
        del filtered_input_data[key]
        bull_info_data = bull_info_data.drop(columns=[key], axis=1)
        #input_data[key] = bull_info_data[key].median()

input_data = filtered_input_data

filtered_bull_info_data = bull_info_data[bull_info_data['type_of_bull'] == input_data['type_of_bull']]
bull_info_non_dropped_columns = bull_info_non_dropped_columns[bull_info_non_dropped_columns['type_of_bull'] == input_data['type_of_bull']]
if len(filtered_bull_info_data) == 0:
    print("No bulls of type:", input_data['type_of_bull'])

filtered_bull_info_data = filtered_bull_info_data.drop(columns=['type_of_bull']).drop(columns=['bull_name'])
bull_info_non_dropped_columns = bull_info_non_dropped_columns.drop(columns=['type_of_bull']).drop(columns=['bull_name'])
# Convert farmer preferences to numpy array
farmer_preferences = np.array(list(input_data.values())[1:])  # Exclude 'type_of_bull'


# Normalize data
scaler = StandardScaler()
scaler.fit(filtered_bull_info_data.iloc[:,1:])  # Exclude 'bull_id' column
normalized_bull_info = scaler.transform(filtered_bull_info_data.iloc[:,1:])

# Convert farmer_preferences to a DataFrame with the same feature names as filtered_bull_info_data
farmer_preferences_df = pd.DataFrame([farmer_preferences], columns=filtered_bull_info_data.columns[1:])

# Normalize farmer_preferences
normalized_farmer_preferences = scaler.transform(farmer_preferences_df)



# Import necessary libraries
from sklearn.neighbors import NearestNeighbors
import numpy as np



# Create a KNN model
knn_model = NearestNeighbors(n_neighbors=10, metric='euclidean')

# Fit the model to your data
knn_model.fit(normalized_bull_info)

# Find the 10 nearest neighbors to `farmer_preferences`
distances, indices = knn_model.kneighbors(normalized_farmer_preferences.reshape(1, -1))

# `indices` now contains the indices of the 10 nearest neighbors
# `indices` is a 2D array, so we flatten it to 1D for use with `iloc`
indices_1d = indices.flatten()




# Get the rows from `filtered_bull_info_data` that correspond to the indices
selected_rows = bull_info_non_dropped_columns.iloc[indices_1d].copy()
selected_rows.loc[:, 'bull_name'] = bull_info_data.loc[selected_rows.index, 'bull_name'].values
selected_rows.loc[:, 'type_of_bull'] = bull_info_data.loc[selected_rows.index, 'type_of_bull'].values
bulls_list=[]
for index, row in selected_rows.iterrows():
    # Create a dictionary for the current row
    bull_dict = {
        "bull_id": row["bull_id"],
        "backfat_thickness": row["backfat_thickness"],
        "ribeye_area": row["ribeye_area"],
        "marbling_score": row["marbling_score"],
        "dressing_percentage": row["dressing_percentage"],
        "subcutaneous_fat": row["subcutaneous_fat"],
        "visceral_fat": row["visceral_fat"],
        "lean_meat_yield": row["lean_meat_yield"],
        "residual_average_daily_gain": row["residual_average_daily_gain"],
        "dry_matter_intake": row["dry_matter_intake"],
        "yearling_weight": row["yearling_weight"],
        "working_weight": row["working_weight"],
        "birth_weight": row["birth_weight"],
        "calving_ease_direct": row["calving_ease_direct"],
        "yearling_height": row["yearling_height"],
        "age_at_collection": row["age_at_collection"],
        "mature_height": row["mature_height"],
        "mature_weight": row["mature_weight"],
        "price_of_semen": row["price_of_semen"],
        "bull_name": row["bull_name"],
        "type_of_bull": row["type_of_bull"]

    }
    
    # Append the dictionary to the list
    bulls_list.append(bull_dict)

# Print the resulting list of dictionaries
bulls_list_string_representation = json.dumps(bulls_list)
print(bulls_list_string_representation)
