import uuid from 'uuid';

// Must be constant for comment snapshot 'days ago' rendering
const commentDate = new Date();
commentDate.setDate(commentDate.getDate() - 4);

const defaults = {

  settings: {
    type: "settings",
    attributes: {
      general: {},
      theme: {
        typekitId: "typekitId"
      },
      oauth: {
        facebook: {
          enabled: false
        },
        googleOauth2: {
          enabled: true
        },
        twitter: {
          enabled: true
        }
      },
      features: {},
      integrations: {
        gaProfileId: "1234",
        gaTrackingId: "1234",
        twitterAppId: "1234",
        facebookAppId: "1234",
        googleClientId: "1234",
        googleProjectId: "1234",
        googleClientEmail: "1234",
        twitterAccessToken: "1234",
        googlePrivateKeyId: "1234",
        googleOauthClientId: "1234"
      },
      secrets: {
        googlePrivateKey: null,
        twitterAppSecret: null,
        facebookAppSecret: null,
        googleOauthClientSecret: null,
        twitterAccessTokenSecret: null
      },
      pressLogoStyles: {
        small: null,
        smallSquare: null,
        smallLandscape: null,
        smallPortrait: null,
        medium: null,
        mediumSquare: null,
        mediumLandscape: null,
        mediumPortrait: null,
        largeLandscape: null,
        original: null
      }
    },
  },

  project: {
    type: "projects",
    attributes: {
      title: "Rowan Test",
      subtitle: "World's Greatest Dog",
      heroStyles: {},
      coverStyles: {},
      avatarStyles: {},
      hashtag: "#cute_dog"
    },
    relationships: {
      resources: []
    }
  },

  collection: {
    type: "collections",
    attributes: {
      title: "Rowan",
      createdAt: "2017-04-24T23:25:50.161Z",
      resourceKinds: ["image", "video"],
      resourceTags: ["dog"],
      thumbnailStyles: {}
    },
    relationships: {
      resources: []
    }
  },

  collectionResource: {
    type: "collectionResources",
    attributes: {
      position: 1,
      collectionId: 2
    },
    relationships: {
      resource: null,
      collection: null
    }
  },

  resource: {
    type: "resources",
    attributes: {
      title: "Image",
      titleFormatted: "Image",
      kind: "image",
      attachmentStyles: {
        original: "original-image.mock",
        medium: null
      },
      descriptionFormatted: "Black and white freckles",
      createdAt: "2017-04-24T23:25:50.161Z",
      captionFormatted: "World's Greatest Dog",
      downloadable: true,
      tagList: ["dog", "puppy", "GOAT"]
    },
    relationships: {
      collectionResources: []
    }
  },

  ingestion: {
    type: "ingestions",
    attributes: {
      state: "analyzed",
      sourceFileName: "some-file.epub",
      externalSourceUrl: null,
      strategy: "Ingestor::Strategy::EPUB::Strategy",
      availableEvents: ["reset", "process"]
    }
  },

  comment: {
    type: "comments",
    attributes: {
      body: "Plaid clash with polka dots, I hope you ain't mad.",
      createdAt: commentDate
    },
    relationships: {
      creator: null
    }
  },

  user: {
    type: "users",
    attributes: {
      email: "test@cic-fake.gotcha",
      firstName: "Rowan",
      lastName: "Ida",
      fullName: "Rowan Ida",
      role: "Admin",
      avatarStyles: {},
      isCurrentUser: true
    }
  },

  event: {
    type: "events",
    attributes: {
      eventType: "TEXT_ADDED",
      eventTitle: "Text Added",
      eventSubtitle: "It was added",
      subjectType: "Text",
      subjectTitle: "New Text",
      createdAt: "2017-04-24T23:25:50.161Z"
    }
  },

  tweetEvent: {
    type: "events",
    attributes: {
      eventType: "TWEET",
      eventTitle: "Tweet Created",
      subjectType: "Tweet",
      subjectTitle: "New Tweet",
      createdAt: "2017-04-24T23:25:50.161Z",
      attributionName: "Manifold Scholarship",
      attributionUrl: "https://twitter.com/ManifoldScholar",
      attributionIdentifier: "ManifoldScholar",
      excerpt: "Manifold is great!"
    }
  },

  text: {
    type: "texts",
    attributes: {
      title: "Ain't No Thang",
      creatorNames: "Andre3000, Big Boi",
      createdAt: "2017-04-24T23:25:50.161Z",
      published: true,
      coverStyles: {},
      rights: "All Rights Reserved",
      publicationDate: "2001-12-04",
      toc: ["Chapter 1", "Chapter 2"]
    },
    relationships: {
      project: null,
      category: null
    }
  },

  category: {
    type: "categories",
    attributes: {
      title: "Hip Hop Classics",
      position: 1
    },
    relationships: {}
  },

  annotation: {
    type: "annotations",
    attributes: {
      subject: "Gods, Earths, and 85ers",
      body: "Hands on your boxes, turn 'em up like seven notches." +
      " Your Magnavoxes amplify my super conscious.",
      startNode: "some-node",
      endNode: "another-node",
      startChar: 4,
      endChar: 13
    }
  },

  textSection: {
    type: "textSections",
    kind: "section",
    sourceIdentifier: "ro-dintl-001",
    attributes: {
      name: "Title Page",
      bodyJson: {
        tag: "section",
        nodeType: "element",
        attributes: {
          id: "RO",
          type: "titlepage",
          class: "chapter"
        },
        children: {
          0: {
            tag: "h1",
            nodeType: "element",
            attributes: {},
            children: {
              0: {
                content: "A day in the life of Rowan",
                nodeType: "text",
                nodeUuid: "1234-5678-9000",
                textDigest: "1234-5678-9000"
              }
            }
          }
        }
      }
    }
  }
};

const buildEntity = (entityType, id = null, attributes, relationships) => {
  const entity = defaults[entityType];
  return {
    type: entity.type,
    id: id || uuid.v1(),
    attributes: Object.assign({}, entity.attributes, attributes),
    relationships: Object.assign({}, entity.relationships, relationships)
  };
};

const project = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("project", id, attributes, relationships);
};

const resource = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("resource", id, attributes, relationships);
};

const ingestion = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("ingestion", id, attributes, relationships);
};

const collection = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("collection", id, attributes, relationships);
};

const collectionResource = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("collectionResource", id, attributes, relationships);
};

const comment = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("comment", id, attributes, relationships);
};

const user = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("user", id, attributes, relationships);
};

const settings = (id = 0, attributes = {}, relationships = {}) => {
  return buildEntity("settings", id, attributes, relationships);
};

const event = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("event", id, attributes, relationships);
};

const tweetEvent = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("tweetEvent", id, attributes, relationships);
};

const text = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("text", id, attributes, relationships);
};

const category = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("category", id, attributes, relationships);
};

const annotation = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("annotation", id, attributes, relationships);
};

const textSection = (id = null, attributes = {}, relationships = {}) => {
  return buildEntity("textSection", id, attributes, relationships);
};

export default {
  defaults,
  project,
  resource,
  ingestion,
  collection,
  collectionResource,
  comment,
  user,
  settings,
  event,
  tweetEvent,
  text,
  category,
  annotation,
  textSection
};