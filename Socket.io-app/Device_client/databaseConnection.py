from pymongo import MongoClient
import pymongo
import datetime

def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://joshcoward63:Dexter.98@cluster0.sqang.mongodb.net/test"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['Devices']

    # This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    
    # Get the database
    dbname = get_database()
    # print(dbname)
    collection_name = dbname["Grow Room Temp"]
    collection_name.insert_one({"temperature": 990, "timeStamp": datetime.datetime.utcnow()})
    items = collection_name.find().sort('timeStamp',-1)
    for item in items:
        print(item)
