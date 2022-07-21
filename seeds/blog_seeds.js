const Blog = require('../models/Blog');

const blogSeeds = [
	{
		"title": "Why MVC is so important",
		"content": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data. the View layer for design , and the Controller layer for application logic",
		"user_id": 3,
	  },
	  {
		"title": "The Ultimate Tech Quiz",
		"content": "There is a difference between authentication and authorization. Authentication means confirming your own identity,whereas authorization means being allowed access to the system",
		"user_id": 3,

	  },
	  {
		"title": "Object-Relational Mapping",
		"content": "Have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
		"user_id": 3,
	  },
	  {
		"id": 4,
		"title": "Electric Van Company Goes Bankrupt, But the Idea Behind It Is Solid",
		"content": "The recent Chapter 7 failure of EV startup ELMS probably encouraged some electric vehicle haters to gloat, but electric last-mile delivery trucks remain the strongest immediate bet, to my mind, in electric vehicles.\n\nThe four biggest home delivery fleets in the US -- Amazon, UPS, FedEx and DHL -- know what the North American Council on Freight Efficiency predicts: An electric last mile van uses about $2,000 of energy a year compared to $10,000 a year in fuel, calculated at $2.98 a gallon. That wasn't enough to save ELMS from its financial ambiguities, alleged stock shenanigans and executive departures.\n\nELMS Class 1 van\nELMS\nThe company offered a Class 1 urban delivery van with 110 miles of range at a base price of $28,000 and a larger Class 3 chassis that would normally be fitted with a cargo box offering 125 miles of range. Those range numbers would underwhelm any electric car buyer but are actually evidence of why electric delivery vans make sense: They can nail a major work role with easily attained range, dovetailing with many other traits of electrification beyond that.",
		"user_id": 3,
		"createdAt": "2022-06-19T05:32:38.000Z",
		"updatedAt": "2022-06-19T05:32:38.000Z"
	},
	{
		"id": 5,
		"title": "CDC Recommends COVID Vaccines for Kids as Young as 6 Months Old",
		"content": "      The US Centers for Disease Control and Prevention on Saturday recommended Moderna's and Pfizer's COVID vaccines for all children 6 months through 5 years of age. \n\nEarlier in the day, science advisers to the CDC voted unanimously to recommend the shots, and CDC Director Dr. Rochelle Walensky later approved the advisers' recommendation. The move expands eligibility for vaccination to nearly 20 million additional children, and parents could be able to start getting young kids their shots early next week.\n\n\"Together, with science leading the charge, we have taken another important step forward in our nation's fight against COVID-19,\" Walensky said in a statement. \"We know millions of parents and caregivers are eager to get their young children vaccinated, and with today's decision, they can. I encourage parents and caregivers with questions to talk to their doctor, nurse, or local pharmacist to learn more about the benefits of vaccinations and the importance of protecting their children by getting them vaccinated.\"    \n\nAll children, including kids who've already had COVID-19, should get vaccinated, the CDC said in a release, adding that COVID vaccines have been subjected to the most intensive safety monitoring in US history, and will continue to be closely monitored.",
		"user_id": 3,
		"createdAt": "2022-06-19T06:07:41.000Z",
		"updatedAt": "2022-06-19T06:07:41.000Z",
	}
  
];

const blogAlerts = () => Blog.bulkCreate(blogSeeds);

module.exports = blogAlerts;