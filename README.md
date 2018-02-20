## Content Recommender 

A basic tool which on user login provides 10 stack overflow issues wherein when a user selects one of the links the tool recommends 10 Java Tutorials related to the issue.

### Tasks Involved:
 * Scraping data from Java Wikibooks and storing it on ElasticSearch for Indexing
 * Getting keywords from the stack overflow posts and searching it on ElasticSearch using ElasticSearch API
 * Displaying the top 10 results on the webpage based on the score on the DB
