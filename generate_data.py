import random
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# List of masculine adjectives
masculine_adjectives = [
    "Majestic",
    "Dominant",
    "Powerful",
    "Stalwart",
    "Mighty",
    "Formidable",
    "Robust",
    "Vigorous",
    "Muscular",
    "Fierce",
    "Courageous",
    "Fearless",
    "Strong",
    "Brave",
    "Bold",
    "Daring",
    "Resilient",
    "Tenacious",
    "Gallant",
    "Valiant",
    "Heroic",
    "Indomitable",
    "Sturdy",
    "Solid",
    "Intrepid",
    "Dauntless",
    "Adventurous",
    "Determined",
    "Loyal",
    "Relentless",
    "Steadfast",
    "Unyielding",
    "Unwavering",
    "Unbowed",
    "Unconquerable",
    "Majestic",
    "Magnificent",
    "Imposing",
    "Regal",
    "Noble",
    "Grand",
    "Proud",
    "Sovereign",
    "Imperial",
    "Eminent",
    "Prestigious",
    "Supreme",
    "Exalted",
    "Awe-Inspiring",
    "Commanding",
    "Legendary"
]

# List of masculine bull nouns
masculine_bull_nouns = [
    "Bull",
    "Stallion",
    "Sire",
    "Male",
    "Bullfighter",
    "Beast",
    "Brute",
    "Charger",
    "Dominator",
    "Leader",
    "Fighter",
    "Champion",
    "Ruler",
    "Protector",
    "Guardian",
    "Alpha",
    "Powerhouse",
    "Monster",
    "Warrior",
    "Warlord",
    "Bruiser",
    "Brawler",
    "Gladiator",
    "Giant",
    "Colossus",
    "Titan",
    "Hulk",
    "Ram",
    "Heifer",
    "Buck",
    "Challenger",
    "Conqueror",
    "Bullion",
    "Boss",
    "Lord",
    "Tyrant",
    "Knockout",
    "Patriarch",
    "Herdsman",
    "Bullwhip",
    "Bullhorn",
    "Bullneck",
    "Bullseye",
    "Bullfrog",
    "Bullion",
    "Bullmastiff",
    "Bullfinch",
    "Bullterrier",
    "Bulldog",
    "Bullmastiff"
]

# Define ranges for each parameter
ranges = {
    "bull_id":[0, 500],
    "backfat_thickness": (0.15, 1.2),
    "ribeye_area": (10, 20),
    "marbling_score": (1, 12),
    "dressing_percentage": (55, 65),
    "subcutaneous_fat": (0.2, 1.5),
    "visceral_fat": (0.1, 0.5),
    "lean_meat_yield": (50, 70),  # Assume percentage
    "residual_average_daily_gain": (1.5, 3.5),
    "dry_matter_intake": (1, 3),  # Assume percentage of body weight
    "yearling_weight": (400, 1300),
    "working_weight": (600, 1200),  # Assume similar to yearling weight
    "birth_weight": (60, 120),
    "calving_ease_direct": (0, 10),  # Example range, actual range may vary
    "yearling_height": (48, 60),
    "type_of_bull": ["Angus",
    "Hereford",
    "Simmental",
    "Charolais",
    "Limousin",
    "Brahman",
    "Gelbvieh",
    "Brangus",
    "Beefmaster",
    "Santa Gertrudis"
],
    "age_at_collection": (1, 6),  # Assume in years
    "mature_height": (50, 70),
    "mature_weight": (1500, 2500),
    "price_of_semen": (10, 100)  # Example range, actual range may vary
}
param_stats = {
    "backfat_thickness": {"mean": 0.5, "std": 0.1},
    "ribeye_area": {"mean": 15, "std": 2},
    "marbling_score": {"mean": 6.5, "std": 2.5},
    "dressing_percentage": {"mean": 60, "std": 2.5},
    "subcutaneous_fat": {"mean": 0.85, "std": 0.3},
    "visceral_fat": {"mean": 0.3, "std": 0.1},
    "lean_meat_yield": {"mean": 60, "std": 5},
    "residual_average_daily_gain": {"mean": 2.5, "std": 0.5},
    "dry_matter_intake": {"mean": 2, "std": 2},
    "yearling_weight": {"mean": 850, "std": 200},
    "working_weight": {"mean": 900, "std": 150},
    "birth_weight": {"mean": 90, "std": 15},
    "calving_ease_direct": {"mean": 4, "std": 2},
    "yearling_height": {"mean": 54, "std": 3},
    "age_at_collection": {"mean": 3.5, "std": 1.5},
    "mature_height": {"mean": 60, "std": 5},
    "mature_weight": {"mean": 2000, "std": 300},
    "price_of_semen": {"mean": 55, "std": 15}

}
# Generate random data for each parameter
random_data_list = []
for _ in range(900):  
    random_data = {}
    for param, value_range in ranges.items():
        if isinstance(value_range, tuple):
            if param != "bull_id":
                mean = param_stats[param]["mean"]
                std = param_stats[param]["std"]
                random_data[param] = round(np.random.normal(mean, std), 1)
        elif isinstance(value_range, list):
            random_data[param] = random.choice(value_range)
    random_data_list.append(random_data)

random_data_df = pd.DataFrame(random_data_list)
random_data_df['bull_id'] = range(1, len(random_data_df) + 1)

row_count = 0
for i in range(30):
    for j in range(30):
        random_data_df.at[row_count, 'bull_name'] = masculine_adjectives[i] + " " + masculine_bull_nouns[j]
        row_count += 1

# Save the generated data to bull_data.csv
random_data_df.to_csv("C:/dev-ct/buildDSM/bull_info.csv", index=False)

plt.figure(figsize=(10, 6))
plt.hist(random_data_df['calving_ease_direct'], bins=20, color='skyblue', edgecolor='black')
plt.title('Distribution of Calving Ease Direct (CED)')
plt.xlabel('Calving Ease Direct (CED)')
plt.ylabel('Frequency')
plt.grid(True)
plt.show()