import content, { IContent } from "../models/content";

export const data:IContent[] = [
    {
      title: "The Great Adventure",
      contentType: "Movie",
      description: "An epic adventure of a group of explorers in a mysterious land.",
      genres: ["Action", "Fantasy"],
      releaseDate: "2024-06-15T12:00:00.000+00:00",
      episodes: [],
      director: ["James Cameron"],
      actors: ["Tom Hanks", "Scarlett Johansson"]
    },
    {
      title: "Love in Paris",
      contentType: "Movie",
      description: "A romantic tale set in the beautiful city of Paris.",
      genres: ["Romance", "Drama"],
      releaseDate: "2024-02-14T18:30:00.000+00:00",
      episodes: [],
      director: ["Nora Ephron"],
      actors: ["Emma Stone", "Ryan Gosling"]
    },
    {
      title: "Haunted Manor",
      contentType: "Movie",
      description: "A spine-chilling horror story set in an old haunted manor.",
      genres: ["Horror"],
      releaseDate: "2024-10-31T20:00:00.000+00:00",
      episodes: [],
      director: ["Guillermo del Toro"],
      actors: ["Daniel Radcliffe", "Emily Blunt"]
    },
    {
      title: "Space Explorers",
      contentType: "Movie",
      description: "A science fiction adventure following a team of astronauts.",
      genres: ["SciFi", "Action"],
      releaseDate: "2024-08-20T14:45:00.000+00:00",
      episodes: [],
      director: ["Christopher Nolan"],
      actors: ["Matthew McConaughey", "Anne Hathaway"]
    },
    {
      title: "Laughter Therapy",
      contentType: "Movie",
      description: "A hilarious comedy about a group of friends navigating life.",
      genres: ["Comedy"],
      releaseDate: "2024-05-01T12:00:00.000+00:00",
      episodes: [],
      director: ["Todd Phillips"],
      actors: ["Zach Galifianakis", "Bradley Cooper"]
    },
    {
      title: "Mystery Island",
      contentType: "TVShow",
      description: "A group of strangers wake up on a mysterious island with no memory of how they got there.",
      genres: ["Drama", "Fantasy"],
      releaseDate: "2024-01-10T10:00:00.000+00:00",
      episodes: [
        {
          title: "The Awakening",
          description: "The group discovers the island's mysteries.",
          releaseDate: "2024-01-10T10:00:00.000+00:00"
        },
        {
          title: "Strange Encounters",
          description: "The group encounters strange beings.",
          releaseDate: "2024-01-17T10:00:00.000+00:00"
        }
      ],
      director: ["J.J. Abrams"],
      actors: ["Evangeline Lilly", "Jorge Garcia"]
    },
    {
      title: "Tech Pioneers",
      contentType: "TVShow",
      description: "The story of the rise and fall of a tech startup.",
      genres: ["Drama", "Comedy"],
      releaseDate: "2024-03-20T15:00:00.000+00:00",
      episodes: [
        {
          title: "The Beginning",
          description: "The startup's humble beginnings.",
          releaseDate: "2024-03-20T15:00:00.000+00:00"
        },
        {
          title: "Rapid Growth",
          description: "The startup experiences rapid growth.",
          releaseDate: "2024-03-27T15:00:00.000+00:00"
        }
      ],
      director: ["Aaron Sorkin"],
      actors: ["Jesse Eisenberg", "Andrew Garfield"]
    },
    {
      title: "Galactic Wars",
      contentType: "TVShow",
      description: "Epic battles between galactic empires.",
      genres: ["Action", "SciFi"],
      releaseDate: "2024-04-15T18:00:00.000+00:00",
      episodes: [
        {
          title: "The Battle Begins",
          description: "The first battle of the galactic war.",
          releaseDate: "2024-04-15T18:00:00.000+00:00"
        },
        {
          title: "Empire Strikes",
          description: "The empire launches a counterattack.",
          releaseDate: "2024-04-22T18:00:00.000+00:00"
        }
      ],
      director: ["George Lucas"],
      actors: ["Mark Hamill", "Carrie Fisher"]
    },
    {
      title: "Haunted Manor",
      contentType: "TVShow",
      description: "A spine-chilling horror series set in an old haunted manor.",
      genres: ["Horror"],
      releaseDate: "2024-10-31T20:00:00.000+00:00",
      episodes: [
        {
          title: "The Haunting",
          description: "The manor's dark past is revealed.",
          releaseDate: "2024-10-31T20:00:00.000+00:00"
        },
        {
          title: "Ghostly Apparitions",
          description: "Ghostly apparitions terrorize the residents.",
          releaseDate: "2024-11-07T20:00:00.000+00:00"
        }
      ],
      director: ["Guillermo del Toro"],
      actors: ["Daniel Radcliffe", "Emily Blunt"]
    },
    {
      title: "Space Explorers",
      contentType: "TVShow",
      description: "A science fiction adventure following a team of astronauts.",
      genres: ["SciFi", "Action"],
      releaseDate: "2024-08-20T14:45:00.000+00:00",
      episodes: [
        {
          title: "Mission Launch",
          description: "The astronauts embark on their mission.",
          releaseDate: "2024-08-20T14:45:00.000+00:00"
        },
        {
          title: "Alien Encounter",
          description: "The team encounters alien life.",
          releaseDate: "2024-08-27T14:45:00.000+00:00"
        }
      ],
      director: ["Christopher Nolan"],
      actors: ["Matthew McConaughey", "Anne Hathaway"]
    },
    {
      title: "Laughter Therapy",
      contentType: "TVShow",
      description: "A hilarious comedy about a group of friends navigating life.",
      genres: ["Comedy"],
      releaseDate: "2024-05-01T12:00:00.000+00:00",
      episodes: [
        {
          title: "The Big Joke",
          description: "The friends play a big prank.",
          releaseDate: "2024-05-01T12:00:00.000+00:00"
        },
        {
          title: "Laugh Out Loud",
          description: "A day filled with hilarious events.",
          releaseDate: "2024-05-08T12:00:00.000+00:00"
        }
      ],
      director: ["Todd Phillips"],
      actors: ["Zach Galifianakis", "Bradley Cooper"]
    },
    {
      title: "Ancient Secrets",
      contentType: "TVShow",
      description: "A documentary series uncovering the secrets of ancient civilizations.",
      genres: ["History", "Mystery"],
      releaseDate: "2024-07-10T16:00:00.000+00:00",
      episodes: [
        {
          title: "The Pyramids",
          description: "Exploring the mysteries of the pyramids.",
          releaseDate: "2024-07-10T16:00:00.000+00:00"
        },
        {
          title: "Lost Cities",
          description: "Uncovering the secrets of lost cities.",
          releaseDate: "2024-07-17T16:00:00.000+00:00"
        }
      ],
      director: ["Ken Burns"],
      actors: ["Narrator"]
    },
    {
      title: "Crime Chronicles",
      contentType: "TVShow",
      description: "A crime drama series following detectives solving complex cases.",
      genres: ["Crime", "Drama"],
      releaseDate: "2024-09-15T21:00:00.000+00:00",
      episodes: [
        {
          title: "The First Case",
          description: "The detectives tackle their first big case.",
          releaseDate: "2024-09-15T21:00:00.000+00:00"
        },
        {
          title: "The Suspect",
          description: "A suspect is brought in for questioning.",
          releaseDate: "2024-09-22T21:00:00.000+00:00"
        }
      ],
      director: ["David Fincher"],
      actors: ["Kevin Spacey", "Gillian Anderson"]
    },
    {
      title: "Magic Academy",
      contentType: "TVShow",
      description: "A fantasy series about students learning magic at a hidden academy.",
      genres: ["Fantasy", "Adventure"],
      releaseDate: "2024-11-01T17:00:00.000+00:00",
      episodes: [
        {
          title: "The New Student",
          description: "A new student discovers the academy.",
          releaseDate: "2024-11-01T17:00:00.000+00:00"
        },
        {
          title: "Magical Trials",
          description: "Students undergo magical trials.",
          releaseDate: "2024-11-08T17:00:00.000+00:00"
        }
      ],
      director: ["Peter Jackson"],
      actors: ["Daniel Radcliffe", "Emma Watson"]
    },
    {
      title: "Survival Quest",
      contentType: "TVShow",
      description: "A reality show where contestants are dropped into the wilderness to survive.",
      genres: ["Adventure", "Reality"],
      releaseDate: "2024-02-20T19:00:00.000+00:00",
      episodes: [
        {
          title: "The Arrival",
          description: "Contestants arrive at the survival location.",
          releaseDate: "2024-02-20T19:00:00.000+00:00"
        },
        {
          title: "First Challenge",
          description: "The contestants face their first survival challenge.",
          releaseDate: "2024-02-27T19:00:00.000+00:00"
        }
      ],
      director: ["Mark Burnett"],
      actors: ["Contestants"]
    }
  ];
  

  
 