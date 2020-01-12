I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || {}), {
  "activemodel": {
    "errors": {
      "format": "%{attribute} %{message}",
      "messages": {
        "accepted": "must be accepted",
        "blank": "can't be blank",
        "confirmation": "doesn't match %{attribute}",
        "empty": "can't be empty",
        "equal_to": "must be equal to %{count}",
        "even": "must be even",
        "exclusion": "is reserved",
        "greater_than": "must be greater than %{count}",
        "greater_than_or_equal_to": "must be greater than or equal to %{count}",
        "inclusion": "is not included in the list",
        "invalid": "is invalid",
        "less_than": "must be less than %{count}",
        "less_than_or_equal_to": "must be less than or equal to %{count}",
        "malformed_kana_dictionary": "format error: %{line}(%{no})",
        "not_a_number": "is not a number",
        "not_an_integer": "must be an integer",
        "odd": "must be odd",
        "other_than": "must be other than %{count}",
        "present": "must be blank",
        "record_invalid": "Validation failed: %{errors}",
        "restrict_dependent_destroy": {
          "many": "Cannot delete record because dependent %{record} exist",
          "one": "Cannot delete record because a dependent %{record} exists"
        },
        "taken": "has already been taken",
        "too_long": {
          "one": "is too long (maximum is 1 character)",
          "other": "is too long (maximum is %{count} characters)"
        },
        "too_short": {
          "one": "is too short (minimum is 1 character)",
          "other": "is too short (minimum is %{count} characters)"
        },
        "wrong_length": {
          "one": "is the wrong length (should be 1 character)",
          "other": "is the wrong length (should be %{count} characters)"
        }
      },
      "template": {
        "body": "There were problems with the following fields:",
        "header": {
          "one": "1 error prohibited this %{model} from being saved",
          "other": "%{count} errors prohibited this %{model} from being saved"
        }
      }
    }
  },
  "activerecord": {
    "errors": {
      "format": "%{attribute} %{message}",
      "messages": {
        "accepted": "must be accepted",
        "blank": "can't be blank",
        "confirmation": "doesn't match %{attribute}",
        "empty": "can't be empty",
        "equal_to": "must be equal to %{count}",
        "even": "must be even",
        "exclusion": "is reserved",
        "greater_than": "must be greater than %{count}",
        "greater_than_or_equal_to": "must be greater than or equal to %{count}",
        "inclusion": "is not included in the list",
        "invalid": "is invalid",
        "less_than": "must be less than %{count}",
        "less_than_or_equal_to": "must be less than or equal to %{count}",
        "malformed_kana_dictionary": "format error: %{line}(%{no})",
        "not_a_number": "is not a number",
        "not_an_integer": "must be an integer",
        "odd": "must be odd",
        "other_than": "must be other than %{count}",
        "present": "must be blank",
        "record_invalid": "Validation failed: %{errors}",
        "restrict_dependent_destroy": {
          "many": "Cannot delete record because dependent %{record} exist",
          "one": "Cannot delete record because a dependent %{record} exists"
        },
        "taken": "has already been taken",
        "too_long": {
          "one": "is too long (maximum is 1 character)",
          "other": "is too long (maximum is %{count} characters)"
        },
        "too_short": {
          "one": "is too short (minimum is 1 character)",
          "other": "is too short (minimum is %{count} characters)"
        },
        "wrong_length": {
          "one": "is the wrong length (should be 1 character)",
          "other": "is the wrong length (should be %{count} characters)"
        }
      },
      "template": {
        "body": "There were problems with the following fields:",
        "header": {
          "one": "1 error prohibited this %{model} from being saved",
          "other": "%{count} errors prohibited this %{model} from being saved"
        }
      }
    }
  },
  "date": {
    "abbr_day_names": [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ],
    "abbr_month_names": [
      null,
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    "day_names": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "formats": {
      "default": "%Y-%m-%d",
      "long": "%B %d, %Y",
      "short": "%b %d"
    },
    "month_names": [
      null,
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    "order": [
      "year",
      "month",
      "day"
    ]
  },
  "datetime": {
    "distance_in_words": {
      "about_x_hours": {
        "one": "about 1 hour",
        "other": "about %{count} hours"
      },
      "about_x_months": {
        "one": "about 1 month",
        "other": "about %{count} months"
      },
      "about_x_years": {
        "one": "about 1 year",
        "other": "about %{count} years"
      },
      "almost_x_years": {
        "one": "almost 1 year",
        "other": "almost %{count} years"
      },
      "half_a_minute": "half a minute",
      "less_than_x_minutes": {
        "one": "less than a minute",
        "other": "less than %{count} minutes"
      },
      "less_than_x_seconds": {
        "one": "less than 1 second",
        "other": "less than %{count} seconds"
      },
      "over_x_years": {
        "one": "over 1 year",
        "other": "over %{count} years"
      },
      "x_days": {
        "one": "1 day",
        "other": "%{count} days"
      },
      "x_minutes": {
        "one": "1 minute",
        "other": "%{count} minutes"
      },
      "x_months": {
        "one": "1 month",
        "other": "%{count} months"
      },
      "x_seconds": {
        "one": "1 second",
        "other": "%{count} seconds"
      }
    },
    "prompts": {
      "day": "Day",
      "hour": "Hour",
      "minute": "Minute",
      "month": "Month",
      "second": "Seconds",
      "year": "Year"
    }
  },
  "errors": {
    "dynamic_format": "%{message}",
    "format": "%{attribute} %{message}",
    "messages": {
      "accepted": "must be accepted",
      "blank": "can't be blank",
      "confirmation": "doesn't match %{attribute}",
      "empty": "can't be empty",
      "equal_to": "must be equal to %{count}",
      "even": "must be even",
      "exclusion": "is reserved",
      "greater_than": "must be greater than %{count}",
      "greater_than_or_equal_to": "must be greater than or equal to %{count}",
      "inclusion": "is not included in the list",
      "invalid": "is invalid",
      "less_than": "must be less than %{count}",
      "less_than_or_equal_to": "must be less than or equal to %{count}",
      "malformed_kana_dictionary": "format error: %{line}(%{no})",
      "model_invalid": "Validation failed: %{errors}",
      "not_a_number": "is not a number",
      "not_an_integer": "must be an integer",
      "odd": "must be odd",
      "other_than": "must be other than %{count}",
      "present": "must be blank",
      "record_invalid": "Validation failed: %{errors}",
      "restrict_dependent_destroy": {
        "many": "Cannot delete record because dependent %{record} exist",
        "one": "Cannot delete record because a dependent %{record} exists"
      },
      "taken": "has already been taken",
      "too_long": {
        "one": "is too long (maximum is 1 character)",
        "other": "is too long (maximum is %{count} characters)"
      },
      "too_short": {
        "one": "is too short (minimum is 1 character)",
        "other": "is too short (minimum is %{count} characters)"
      },
      "wrong_length": {
        "one": "is the wrong length (should be 1 character)",
        "other": "is the wrong length (should be %{count} characters)"
      }
    },
    "template": {
      "body": "There were problems with the following fields:",
      "header": {
        "one": "1 error prohibited this %{model} from being saved",
        "other": "%{count} errors prohibited this %{model} from being saved"
      }
    }
  },
  "helpers": {
    "page_entries_info": {
      "entry": {
        "one": "entry",
        "other": "entries",
        "zero": "entries"
      },
      "more_pages": {
        "display_entries": "Displaying %{entry_name} <b>%{first}&nbsp;-&nbsp;%{last}</b> of <b>%{total}</b> in total"
      },
      "one_page": {
        "display_entries": {
          "one": "Displaying <b>1</b> %{entry_name}",
          "other": "Displaying <b>all %{count}</b> %{entry_name}",
          "zero": "No %{entry_name} found"
        }
      }
    },
    "select": {
      "prompt": "Please select"
    },
    "submit": {
      "create": "Create %{model}",
      "submit": "Save %{model}",
      "update": "Update %{model}"
    }
  },
  "mongoid": {
    "errors": {
      "messages": {
        "ambiguous_relationship": {
          "message": "Ambiguous relations %{candidates} defined on %{klass}.",
          "resolution": "On the %{name} relation on %{inverse} you must add an :inverse_of option to specify the exact relationship on %{klass} that is the opposite of %{name}.",
          "summary": "When Mongoid attempts to set an inverse document of a relation in memory, it needs to know which relation it belongs to. When setting %{name}, Mongoid looked on the class %{inverse} for a matching relation, but multiples were found that could potentially match: %{candidates}."
        },
        "blank_in_locale": "can't be blank in %{location}",
        "callbacks": {
          "message": "Calling %{method} on %{klass} resulted in a false return from a callback.",
          "resolution": "Double check all before callbacks to make sure they are not unintentionally returning false.",
          "summary": "If a before callback returns false when using Document.create!, Document#save!, or Document#update_attributes! this error will get raised since the document did not actually get saved."
        },
        "calling_document_find_with_nil_is_invalid": {
          "message": "Calling Document.find with nil is invalid.",
          "resolution": "Most likely this is caused by passing parameters directly through to the find, and the parameter either is not present or the key from which it is accessed is incorrect.",
          "summary": "Document.find expects the parameters to be 1 or more ids, and will return a single document if 1 id is provided, otherwise an array of documents if multiple ids are provided."
        },
        "delete_restriction": {
          "message": "Cannot delete %{document} because of dependent '%{relation}'.",
          "resolution": "Don't attempt to delete the parent %{document} when it has children, or change the dependent option on the relation.",
          "summary": "When defining '%{relation}' with a :dependent => :restrict, Mongoid will raise an error when attempting to delete the %{document} when the child '%{relation}' still has documents in it."
        },
        "document_not_destroyed": {
          "message": "%{klass} with id %{id} was not destroyed.",
          "resolution": "Check the before/after destroy callbacks to ensure that the return values are truthy for the chain to continue.",
          "summary": "When calling %{klass}#destroy! and a callback halts the destroy callback chain by returning a false value, the deletion will not actually occur."
        },
        "document_not_found": {
          "message": "Document(s) not found for class %{klass} with id(s) %{missing}.",
          "resolution": "Search for an id that is in the database or set the Mongoid.raise_not_found_error configuration option to false, which will cause a nil to be returned instead of raising this error when searching for a single id, or only the matched documents when searching for multiples.",
          "summary": "When calling %{klass}.find with an id or array of ids, each parameter must match a document in the database or this error will be raised. The search was for the id(s): %{searched} (%{total} total) and the following ids were not found: %{missing}."
        },
        "document_with_attributes_not_found": {
          "message": "Document not found for class %{klass} with attributes %{attributes}.",
          "resolution": "Search for attributes that are in the database or set the Mongoid.raise_not_found_error configuration option to false, which will cause a nil to be returned instead of raising this error.",
          "summary": "When calling %{klass}.find_by with a hash of attributes, all attributes provided must match a document in the database or this error will be raised."
        },
        "eager_load": {
          "message": "Eager loading :%{name} is not supported since it is a polymorphic belongs_to relation.",
          "resolution": "Don't attempt to perform this action and have patience, maybe this will be supported in the future.",
          "summary": "Mongoid cannot currently determine the classes it needs to eager load when the relation is polymorphic. The parents reside in different collections so a simple id lookup is not sufficient enough."
        },
        "in_memory_collation_not_supported": {
          "message": "A collation option cannot be applied when querying documents in-memory.",
          "resolution": "Remove the collation option from the query.",
          "summary": "The query being run against documents in memory has a collation option set. A collation option is only supported if the query is executed on a MongoDB server with version >= 3.4."
        },
        "invalid_collection": {
          "message": "Access to the collection for %{klass} is not allowed.",
          "resolution": "For access to the collection that the embedded document is in, use %{klass}#_root.collection, or do not attempt to persist an embedded document without a parent set.",
          "summary": "%{klass}.collection was called, and %{klass} is an embedded document - it resides within the collection of the root document of the hierarchy."
        },
        "invalid_config_option": {
          "message": "Invalid configuration option: %{name}.",
          "resolution": "Remove the invalid option or fix the typo. If you were expecting the option to be there, please consult the following page with repect to Mongoid's configuration:\n\n   http://mongoid.org/en/mongoid/docs/installation.html",
          "summary": "A invalid configuration option was provided in your mongoid.yml, or a typo is potentially present. The valid configuration options are: %{options}."
        },
        "invalid_dependent_strategy": {
          "message": "Invalid dependent strategy: %{invalid_strategy}.",
          "resolution": "Change the dependent strategy to one of the valid types.",
          "summary": "An invalid dependent strategy was defined for the association: %{association}. The valid strategies are: %{valid_strategies}."
        },
        "invalid_field": {
          "message": "Defining a field named '%{name}' is not allowed.",
          "resolution": "Use Mongoid.destructive_fields to see what names are not allowed, and don't use these names. These include names that also conflict with core Ruby methods on Object, Module, Enumerable, or included gems that inject methods into these or Mongoid internals.",
          "summary": "Defining this field would override the method '%{name}', which would cause issues with expectations around the original method and cause extremely hard to debug issues. The original method was defined in:\n   Object: %{origin}\n   File: %{file}\n   Line: %{line}"
        },
        "invalid_field_option": {
          "message": "Invalid option :%{option} provided for field :%{name}.",
          "resolution": "When defining the field :%{name} on '%{klass}', please provide valid options for the field. These are currently: %{valid}. If you meant to define a custom field option, please do so first like so:\n\n   Mongoid::Fields.option :%{option} do |model, field, value|\n     # Your logic here...\n   end\n   class %{klass}\n     include Mongoid::Document\n     field :%{name}, %{option}: true\n   end\n\n",
          "summary": "Mongoid requires that you only provide valid options on each field definition in order to prevent unexpected behaviour later on."
        },
        "invalid_includes": {
          "message": "Invalid includes directive: %{klass}.includes(%{args})",
          "resolution": "Ensure that each parameter passed to %{klass}.includes is a valid name of a relation on the %{klass} model. These are: %{relations}.",
          "summary": "Eager loading in Mongoid only supports providing arguments to %{klass}.includes that are the names of relations on the %{klass}."
        },
        "invalid_index": {
          "message": "Invalid index specification on %{klass}: %{spec}, %{options}",
          "resolution": "Ensure that the index conforms to the correct syntax and has the correct options.\n\n Valid options are:\n   background: true|false\n   database: 'database_name'\n   drop_dups: true|false\n   name: 'index_name'\n   sparse: true|false\n   unique: true|false\n   min: 1\n   max: 1\n   bits: 26\n   key: 26\n   bucket_size : 1\n   sphere_version : 1\n   text_version : 1\n   version : 1\n   weights: { content: 1, title: 2 }\n   expire_after_seconds: number_of_seconds\n   partial_filter_expression\n   storage_engine\n   language_override\n   default_language\n   collation\n Valid types are: 1, -1, '2d', '2dsphere', 'geoHaystack', 'text', 'hashed'\n\n Example:\n   class Band\n     include Mongoid::Document\n     index({ name: 1, label: -1 }, { sparse: true })\n     index({ location: '2d' }, { background: true })\n   end\n\n",
          "summary": "Indexes in Mongoid are defined as a hash of field name and direction/2d pairs, with a hash for any additional options."
        },
        "invalid_options": {
          "message": "Invalid option :%{invalid} provided to relation :%{name}.",
          "resolution": "Valid options are: %{valid}, make sure these are the ones you are using.",
          "summary": "Mongoid checks the options that are passed to the relation macros to ensure that no ill side effects occur by letting something slip by."
        },
        "invalid_path": {
          "message": "Having a root path assigned for %{klass} is invalid.",
          "resolution": "Most likely your embedded model, %{klass} is also referenced via a has_many from a root document in another collection. Double check the relation definitions and fix any instances where embedded documents are improperly referenced from other collections.",
          "summary": "Mongoid has two different path objects for determining the location of a document in the database, Root and Embedded. This error is raised when an embedded document somehow gets a root path assigned."
        },
        "invalid_persistence_option": {
          "message": "Invalid persistence option :%{invalid}.",
          "resolution": "Valid options are: %{valid}, make sure these are the ones you are using.",
          "summary": "The options used to change the persistence context must be one of the valid options for a mongo client, or a collection name."
        },
        "invalid_relation": {
          "message": "Defining a relation named '%{name}' is not allowed.",
          "resolution": "Use Mongoid.destructive_fields to see what names are not allowed, and don't use these names. These include names that also conflict with core Ruby methods on Object, Module, Enumerable, or included gems that inject methods into these or Mongoid internals.",
          "summary": "Defining this relation would override the method '%{name}', which would cause issues with expectations around the original method and cause extremely hard to debug issues. The original method was defined in:\n   Object: %{origin}\n   File: %{file}\n   Line: %{line}"
        },
        "invalid_relation_option": {
          "message": "Invalid relation option :%{option} for relation '%{name}' on class %{klass}.",
          "resolution": "Valid options are: %{valid_options}, make sure you use only those.",
          "summary": "An invalid option was provided for a relation."
        },
        "invalid_scope": {
          "message": "Defining a scope of value %{value} on %{klass} is not allowed.",
          "resolution": "Change the scope to be a proc wrapped critera.\n\n Example:\n   class Band\n     include Mongoid::Document\n     scope :inactive, ->{ where(active: false) }\n   end\n\n",
          "summary": "Scopes in Mongoid must be procs that wrap criteria objects."
        },
        "invalid_session_nesting": {
          "message": "A session was started while another session was being used.",
          "resolution": "Only use one session at a time; sessions cannot be nested.",
          "summary": "Sessions cannot be nested. Only one session can be used in a thread at once."
        },
        "invalid_session_use": {
          "message": "A session was attempted to be used with a model whose client cannot use that session.",
          "resolution": "Only execute operations on the model class or instances of the model through which the session was created. Otherwise, ensure that all models on which operations are executed in the session block share the same driver client. For example, a model may have a different client specified in its 'store_in' options.\n\n",
          "summary": "Sessions are started via driver clients (Model#mongo_client) and, in most cases, driver clients are shared across models. When different models have their own clients, a session cannot be obtained via one model and used for operations on another model."
        },
        "invalid_set_polymorphic_relation": {
          "message": "The %{name} attribute can't be set to an instance of %{other_klass} as %{other_klass} has multiple relations referencing %{klass} as %{name}.",
          "resolution": "Set the values from the parent, or redefine the relation with only a single definition in the parent.",
          "summary": "If the parent class of a polymorphic relation has multiple definitions for the same relation, the values must be set from the parent side and not the child side since Mongoid cannot determine from the child side which relation to go in."
        },
        "invalid_storage_options": {
          "message": "Invalid options passed to %{klass}.store_in: %{options}.",
          "resolution": "Change the options passed to store_in to match the documented API, and ensure all keys in the options hash are symbols.\n\n Example:\n   class Band\n     include Mongoid::Document\n     store_in collection: 'artists', database: 'secondary'\n   end\n\n",
          "summary": "The :store_in macro takes only a hash of parameters with the keys :database, :collection, or :client."
        },
        "invalid_storage_parent": {
          "message": "Invalid store_in call on class %{klass}.",
          "resolution": "Remove the store_in call on class %{klass}, as it will use its parent store configuration. Or remove the hierarchy extension for this class.",
          "summary": "The :store_in macro can only be called on a base Mongoid Document"
        },
        "invalid_time": {
          "message": "'%{value}' is not a valid Time.",
          "resolution": "Make sure to pass parsable values to the field setter for Date, DateTime, and Time objects. When this is a String it needs to be valid for Time.parse. Other objects must be valid to pass to Time.local.",
          "summary": "Mongoid tries to serialize the values for Date, DateTime, and Time into proper UTC times to store in the database. The provided value could not be parsed."
        },
        "invalid_value": {
          "message": "Value of type %{value_class} cannot be written to a field of type %{field_class}",
          "resolution": "Verify if the value to be set correspond to field definition",
          "summary": "Tried to set a value of type %{value_class} to a field of type %{field_class}"
        },
        "inverse_not_found": {
          "message": "When adding a(n) %{klass} to %{base}#%{name}, Mongoid could not determine the inverse foreign key to set. The attempted key was '%{inverse}'.",
          "resolution": "If an inverse is not required, like a belongs_to or has_and_belongs_to_many, ensure that :inverse_of => nil is set on the relation. If the inverse is needed, most likely the inverse cannot be figured out from the names of the relations and you will need to explicitly tell Mongoid on the relation what the inverse is.\n\n Example:\n   class Lush\n     include Mongoid::Document\n     has_one :whiskey, class_name: \"Drink\", inverse_of: :alcoholic\n   end\n\n   class Drink\n     include Mongoid::Document\n     belongs_to :alcoholic, class_name: \"Lush\", inverse_of: :whiskey\n   end",
          "summary": "When adding a document to a relation, Mongoid attempts to link the newly added document to the base of the relation in memory, as well as set the foreign key to link them on the database side. In this case Mongoid could not determine what the inverse foreign key was."
        },
        "message_title": "message",
        "mixed_client_configuration": {
          "message": "Both uri and standard configuration options defined for client: '%{name}'.",
          "resolution": "Provide either only a uri as configuration or only standard options.",
          "summary": "Instead of simply giving uri or standard options a preference order, Mongoid assumes that you have made a mistake in your configuration and requires that you provide one or the other, but not both. The options that were provided were: %{config}."
        },
        "mixed_relations": {
          "message": "Referencing a(n) %{embedded} document from the %{root} document via a relational association is not allowed since the %{embedded} is embedded.",
          "resolution": "Consider not embedding %{embedded}, or do the key storage and access in a custom manner in the application code.",
          "summary": "In order to properly access a(n) %{embedded} from %{root} the reference would need to go through the root document of %{embedded}. In a simple case this would require Mongoid to store an extra foreign key for the root, in more complex cases where %{embedded} is multiple levels deep a key would need to be stored for each parent up the hierarchy."
        },
        "nested_attributes_metadata_not_found": {
          "message": "Could not find metadata for relation '%{name}' on model: %{klass}.",
          "resolution": "Make sure that there is a relation defined named '%{name}' on %{klass} or that the relation definition comes before the accepts_nested_attributes_for macro in the model - order matters so that Mongoid has access to the metadata.\n\n Example:\n   class Band\n     include Mongoid::Document\n     has_many :albums\n     accepts_nested_attributes_for :albums\n   end\n\n",
          "summary": "When defining nested attributes for a relation, Mongoid needs to access the metadata for the relation '%{name}' in order if add autosave functionality to it, if applicable. Either no relation named '%{name}' could be found, or the relation had not been defined yet."
        },
        "no_client_config": {
          "message": "No configuration could be found for a client named '%{name}'.",
          "resolution": "Double check your mongoid.yml to make sure under the clients key that a configuration exists for '%{name}'. If you have set the configuration programatically, ensure that '%{name}' exists in the configuration hash.",
          "summary": "When attempting to create the new client, Mongoid could not find a client configuration for the name: '%{name}'. This is necessary in order to know the host, port, and options needed to connect."
        },
        "no_client_database": {
          "message": "No database provided for client configuration: :%{name}.",
          "resolution": "If configuring via a mongoid.yml, ensure that within your :%{name} section a :database value for the client's default database is defined.\n\n Example:\n   development:\n     clients:\n       %{name}:\n         database: my_app_db\n         hosts:\n           - localhost:27017\n\n",
          "summary": "Each client configuration must provide a database so Mongoid knows where the default database to persist to. What was provided was: %{config}."
        },
        "no_client_hosts": {
          "message": "No hosts provided for client configuration: :%{name}.",
          "resolution": "If configuring via a mongoid.yml, ensure that within your :%{name} section a :hosts value for the client hosts is defined.\n\n Example:\n   development:\n     clients:\n       %{name}:\n         database: my_app_db\n         hosts:\n           - localhost:27017\n\n",
          "summary": "Each client configuration must provide hosts so Mongoid knows where the database server is located. What was provided was: %{config}."
        },
        "no_clients_config": {
          "message": "No clients configuration provided.",
          "resolution": "Double check your mongoid.yml to make sure that you have a top-level clients key with at least 1 default client configuration for it. You can regenerate a new mongoid.yml for assistance via `rails g mongoid:config`.\n\n Example:\n   development:\n     clients:\n       default:\n         database: mongoid_dev\n         hosts:\n           - localhost:27017\n\n",
          "summary": "Mongoid's configuration requires that you provide details about each client that can be connected to, and requires in the clients config at least 1 default client to exist."
        },
        "no_default_client": {
          "message": "No default client configuration is defined.",
          "resolution": "If configuring via a mongoid.yml, ensure that within your :clients section a :default client is defined.\n\n Example:\n   development:\n     clients:\n       default:\n         hosts:\n           - localhost:27017\n\n",
          "summary": "The configuration provided settings for: %{keys}, but Mongoid requires a :default to be defined at minimum."
        },
        "no_environment": {
          "message": "Could not load the configuration since no environment was defined.",
          "resolution": "Make sure some environment is set from the mentioned options. Mongoid cannot load configuration from the yaml without knowing which environment it is in, and we have considered defaulting to development an undesireable side effect of this not being defined.",
          "summary": "Mongoid attempted to find the appropriate environment but no Rails.env, Sinatra::Base.environment, RACK_ENV, or MONGOID_ENV could be found."
        },
        "no_map_reduce_output": {
          "message": "No output location was specified for the map/reduce operation.",
          "resolution": "Provide the location that the output of the operation is to go by chaining an #out call to the map/reduce.\n\n Example:\n   Band.map_reduce(map, reduce).out(inline: 1)\n\n Valid options for the out function are:\n   inline:  1\n   merge:   'collection-name'\n   replace: 'collection-name'\n   reduce:  'collection-name'\n\n",
          "summary": "When executing a map/reduce, you must provide the output location of the results. The attempted command was: %{command}."
        },
        "no_metadata": {
          "message": "Metadata not found for document of type %{klass}.",
          "resolution": "Ensure that your relations on the %{klass} model are all properly defined, and that the inverse relations are also properly defined. Embedded relations must have both the parent (embeds_one/embeds_many) and the inverse (embedded_in) present in order to work properly.",
          "summary": "Mongoid sets the metadata of a relation on the document when it is either loaded from within the relation, or added to one. The presence of the metadata is required in order to provide various functionality around relations. Most likely you are getting this error because the document is embedded and was attempted to be persisted without being associated with a parent, or the relation was not properly defined."
        },
        "no_parent": {
          "message": "Cannot persist embedded document %{klass} without a parent document.",
          "resolution": "Ensure that you've set the parent relation if instantiating the embedded document directly, or always create new embedded documents via the parent relation.",
          "summary": "If the document is embedded, in order to be persisted it must always have a reference to its parent document. This is most likely caused by either calling %{klass}.create or %{klass}.create! without setting the parent document as an attribute."
        },
        "readonly_attribute": {
          "message": "Attempted to set the readonly attribute '%{name}' with the value: %{value}.",
          "resolution": "Don't define '%{name}' as readonly, or do not attempt to update its value after the document is persisted.",
          "summary": "Attributes flagged as readonly via Model.attr_readonly can only have values set when the document is a new record."
        },
        "readonly_document": {
          "message": "Attempted to persist the readonly document '%{klass}'.",
          "resolution": "Don't attempt to persist documents that are flagged as readonly.",
          "summary": "Documents loaded from the database using #only cannot be persisted."
        },
        "resolution_title": "resolution",
        "scope_overwrite": {
          "message": "Cannot create scope :%{scope_name}, because of existing method %{model_name}.%{scope_name}.",
          "resolution": "Change the name of the scope so it does not conflict with the already defined method %{model_name}, or set the configuration option Mongoid.scope_overwrite_exception to false, which is its default. In this case a warning will be logged.",
          "summary": "When defining a scope that conflicts with a method that already exists on the model, this error will get raised if Mongoid.scope_overwrite_exception is set to true."
        },
        "sessions_not_supported": {
          "message": "Sessions are not supported by the connected server(s).",
          "resolution": "Verify that all servers in your deployment are at least version 3.6 or don't attempt to use sessions with older server versions.",
          "summary": "A session was attempted to be used with a MongoDB server version that doesn't support sessions. Sessions are supported in MongoDB server versions 3.6 and higher."
        },
        "summary_title": "summary",
        "taken": "is already taken",
        "too_many_nested_attribute_records": {
          "message": "Accepting nested attributes for %{association} is limited to %{limit} records.",
          "resolution": "The limit is set as an option to the macro, for example: accepts_nested_attributes_for :%{association}, limit: %{limit}. Consider raising this limit or making sure no more are sent than the set value.",
          "summary": "More documents were sent to be processed than the allowed limit."
        },
        "unknown_attribute": {
          "message": "Attempted to set a value for '%{name}' which is not allowed on the model %{klass}.",
          "resolution": "You can include Mongoid::Attributes::Dynamic if you expect to be writing values for undefined fields often.",
          "summary": "Without including Mongoid::Attributes::Dynamic in your model and the attribute does not already exist in the attributes hash, attempting to call %{klass}#%{name}= for it is not allowed. This is also triggered by passing the attribute to any method that accepts an attributes hash, and is raised instead of getting a NoMethodError."
        },
        "unknown_model": {
          "message": "Attempted to instantiate an object of the unknown Model '%{klass}'.",
          "resolution": "The _type field is a reserved one used by Mongoid to determine the class for instantiating an object. Please don't save data in this field or ensure that any values in this field correspond to valid Models.",
          "summary": "A document with the value '%{value}' at the key '_type' was used to instantiate a model object but Mongoid cannot find this Class."
        },
        "unsaved_document": {
          "message": "Attempted to save %{document} before the parent %{base}.",
          "resolution": "Make sure to only use create or create! when the parent document %{base} is persisted.",
          "summary": "You cannot call create or create! through the relation (%{document}) whose parent (%{base}) is not already saved. This would cause the database to be out of sync since the child could potentially reference a nonexistent parent."
        },
        "unsupported_javascript": {
          "message": "Executing Javascript $where selector on an embedded criteria is not supported.",
          "resolution": "Please provide a standard hash to #where when the criteria is for an embedded relation.",
          "summary": "Mongoid only supports providing a hash of arguments to #where criterion on embedded documents. Since %{klass} is embedded, the expression %{javascript} is not allowed."
        },
        "validations": {
          "message": "Validation of %{document} failed.",
          "resolution": "Try persisting the document with valid data or remove the validations.",
          "summary": "The following errors were found: %{errors}"
        }
      }
    }
  },
  "number": {
    "currency": {
      "format": {
        "delimiter": ",",
        "format": "%u%n",
        "precision": 2,
        "separator": ".",
        "significant": false,
        "strip_insignificant_zeros": false,
        "unit": "$"
      }
    },
    "format": {
      "delimiter": ",",
      "precision": 3,
      "separator": ".",
      "significant": false,
      "strip_insignificant_zeros": false
    },
    "human": {
      "decimal_units": {
        "format": "%n %u",
        "units": {
          "billion": "Billion",
          "million": "Million",
          "quadrillion": "Quadrillion",
          "thousand": "Thousand",
          "trillion": "Trillion",
          "unit": ""
        }
      },
      "format": {
        "delimiter": "",
        "precision": 3,
        "significant": true,
        "strip_insignificant_zeros": true
      },
      "storage_units": {
        "format": "%n %u",
        "units": {
          "byte": {
            "one": "Byte",
            "other": "Bytes"
          },
          "eb": "EB",
          "gb": "GB",
          "kb": "KB",
          "mb": "MB",
          "pb": "PB",
          "tb": "TB"
        }
      }
    },
    "percentage": {
      "format": {
        "delimiter": "",
        "format": "%n%"
      }
    },
    "precision": {
      "format": {
        "delimiter": ""
      }
    }
  },
  "support": {
    "array": {
      "last_word_connector": ", and ",
      "two_words_connector": " and ",
      "words_connector": ", "
    }
  },
  "time": {
    "am": "am",
    "formats": {
      "default": "%a, %d %b %Y %H:%M:%S %z",
      "long": "%B %d, %Y %H:%M",
      "short": "%d %b %H:%M"
    },
    "pm": "pm"
  },
  "views": {
    "pagination": {
      "first": "&laquo; First",
      "last": "Last &raquo;",
      "next": "Next &rsaquo;",
      "previous": "&lsaquo; Prev",
      "truncate": "&hellip;"
    }
  }
});
I18n.translations["ja"] = I18n.extend((I18n.translations["ja"] || {}), {
  "activemodel": {
    "attributes": {
      "gws/attendance/download_param": {
        "encoding": "文字コード",
        "from_date": "開始日",
        "term": "期間",
        "to_date": "終了日",
        "user_ids": "ユーザー"
      },
      "gws/attendance/time_edit": {
        "in_hour": "時",
        "in_minute": "分",
        "in_reason": "修正理由"
      },
      "gws/memo/message_importer": {
        "in_file": "ファイル"
      },
      "gws/user_csv/importer": {
        "in_file": "ファイル"
      },
      "opendata/dataset_access_report": {
        "export": "出力",
        "period": "期間",
        "type": "単位"
      },
      "opendata/dataset_access_report/type": {
        "day": "日",
        "month": "月",
        "year": "年"
      },
      "opendata/dataset_download_report": {
        "export": "出力",
        "period": "期間",
        "type": "単位"
      },
      "opendata/dataset_download_report/type": {
        "day": "日",
        "month": "月",
        "year": "年"
      },
      "opendata/dataset_importer": {
        "in_file": "ファイル"
      },
      "opendata/dataset_preview_report": {
        "export": "出力",
        "period": "期間",
        "type": "単位"
      },
      "opendata/dataset_preview_report/type": {
        "day": "日",
        "month": "月",
        "year": "年"
      },
      "uploader/file": {
        "content_type": "MIME",
        "filename": "ファイル名",
        "image": "画像",
        "name": "タイトル",
        "path": "ファイル名",
        "size": "ファイルサイズ",
        "state": "上書き保存",
        "text": "内容"
      },
      "webmail/imap_setting": {
        "address": "メールアドレス",
        "default": "既定のアカウント",
        "from": "名前",
        "imap_account": "IMAP/ユーザー名",
        "imap_alias": "転送先メールアドレス",
        "imap_auth_type": "IMAP/認証方式",
        "imap_draft_box": "下書きフォルダー",
        "imap_host": "IMAP/ホスト",
        "imap_password": "IMAP/パスワード",
        "imap_port": "IMAP/ポート",
        "imap_sent_box": "送信済みフォルダー",
        "imap_ssl_use": "IMAP/SSL",
        "imap_trash_box": "ゴミ箱フォルダー",
        "in_imap_password": "IMAP/パスワード",
        "name": "アカウント名",
        "threshold_mb": "警告表示"
      },
      "webmail/mail_importer": {
        "in_file": "ファイル"
      }
    },
    "errors": {
      "format": "%{attribute}%{message}",
      "messages": {
        "accepted": "を受諾してください。",
        "auth_error": "権限がありません。",
        "blank": "を入力してください。",
        "confirmation": "と%{attribute}の入力が一致しません。",
        "contact_system_administrator": "システム管理者にお問い合わせください。",
        "domain": "は有効なドメインを入力してください。",
        "duplicate": "の重複が存在します。",
        "email": "は有効な電子メールアドレスを入力してください。",
        "empty": "を入力してください。",
        "equal_to": "は%{count}にしてください。",
        "even": "は偶数にしてください。",
        "exclusion": "は予約されています。",
        "file_count": "ファイル数（%{size}）が多すぎます（制限値: %{limit}）。",
        "file_scan_exception": "ウイルススキャンに失敗しました。",
        "greater_than": "は%{count}より大きい値にしてください。",
        "greater_than_or_equal_to": "は%{count}以上の値にしてください。",
        "include_not_general_sys_roles": "SYSロール「%{name}」は管理用の権限が含まれている為、設定できません。",
        "inclusion": "は一覧にありません。",
        "invalid": "は不正な値です。",
        "invalid_csv": "CSV形式のファイルを選択してください。",
        "invalid_email_included": "に不正なメールアドレスが含まれています。",
        "invalid_file_type": "は不正なファイル形式です。",
        "invalid_filename": "は半角英数、アンダースコア、ハイフンのみ使用可能です。",
        "invalid_updated": "他のユーザーによって更新されています。編集をやり直してください。",
        "invalid_word": "に無効な語句\"%{word}\"が含まれています。",
        "less_than": "は%{count}より小さい値にしてください。",
        "less_than_or_equal_to": "は%{count}以下の値にしてください。",
        "locked": "「%{user}」さんが編集中のため、編集・削除・移動ができません。",
        "malformed_csv": "CSVの形式が正しくありません。正しい形式のCSVファイルを選択してください。",
        "malformed_kana_dictionary": "書式が不正です: %{line}(%{no})",
        "malformed_liquid_template": "の形式が正しくありません。%{error}",
        "not_a_number": "は数値で入力してください。",
        "not_an_integer": "は整数で入力してください。",
        "not_exist": "は存在しません。",
        "not_found_group": "グループ「%{name}」が見つかりません。",
        "not_found_gws_role": "グループウェア権限「%{name}」が見つかりません。",
        "not_found_main_group": "グループ（主）「%{name}」が見つかりません。",
        "not_found_parent_nodes": "に親フォルダー「%{name}」がありません。",
        "not_found_sys_role": "システム権限「%{name}」が見つかりません。",
        "not_found_user_title": "役職コード「%{code}」が見つかりません。",
        "not_found_webmail_role": "ウェブメール権限「%{name}」が見つかりません。",
        "odd": "は奇数にしてください。",
        "other_than": "は%{count}以外の値にしてください。",
        "present": "は入力しないでください。",
        "record_invalid": "バリデーションに失敗しました。 %{errors}",
        "request_entity_too_large": "データのサイズが大きすぎます。",
        "restrict_dependent_destroy": "%{record}が存在しているので削除できません。",
        "root_node_save_error": "ルートフォルダーを作成できませんでした。",
        "self_user": "ログイン中のユーザーを削除することはできません。",
        "smtp_delivery_error": "メールを送信できませんでした。STMPエラーメッセージ： %{message}",
        "taken": "はすでに存在します。",
        "too_large_file": "%{filename}(%{size}) のサイズが大きすぎます（制限値: %{limit}）。",
        "too_large_mail_size": "メールの添付ファイルサイズが大きすぎます。合計: %{size}（制限値: %{limit}）",
        "too_long": "は%{count}文字以内で入力してください。",
        "too_short": "は%{count}文字以上で入力してください。",
        "try_again_later": "時間を置いてもう一度お試しください。",
        "wrong_length": "は%{count}文字で入力してください。"
      },
      "models": {
        "gws/user_csv/importer": {
          "not_found": "%{line_no}: ID %{id} のユーザーは存在しません。"
        },
        "opendata/dataset_download_report": {
          "attributes": {
            "base": {
              "period": "期間の指定が不正です。開始と終了は同じ、または開始が終了より過去の日付となるよう入力してください。"
            }
          }
        }
      },
      "template": {
        "body": "次の項目を確認してください。",
        "header": "入力内容を確認してください。"
      }
    },
    "models": {
      "gws/memo/message_importer": "インポート",
      "gws/user_csv/importer": "ユーザCSVインポート",
      "opendata/dataset_access_report": "アクセスレポート",
      "opendata/dataset_download_report": "ダウンロードレポート",
      "opendata/dataset_importer": "インポート",
      "opendata/dataset_preview_report": "プレビューレポート",
      "uploader/file": "アップローダー",
      "webmail/mail_importer": "インポート"
    }
  },
  "activerecord": {
    "errors": {
      "format": "%{attribute}%{message}",
      "messages": {
        "accepted": "を受諾してください。",
        "auth_error": "権限がありません。",
        "blank": "を入力してください。",
        "confirmation": "と%{attribute}の入力が一致しません。",
        "contact_system_administrator": "システム管理者にお問い合わせください。",
        "domain": "は有効なドメインを入力してください。",
        "duplicate": "の重複が存在します。",
        "email": "は有効な電子メールアドレスを入力してください。",
        "empty": "を入力してください。",
        "equal_to": "は%{count}にしてください。",
        "even": "は偶数にしてください。",
        "exclusion": "は予約されています。",
        "file_count": "ファイル数（%{size}）が多すぎます（制限値: %{limit}）。",
        "file_scan_exception": "ウイルススキャンに失敗しました。",
        "greater_than": "は%{count}より大きい値にしてください。",
        "greater_than_or_equal_to": "は%{count}以上の値にしてください。",
        "include_not_general_sys_roles": "SYSロール「%{name}」は管理用の権限が含まれている為、設定できません。",
        "inclusion": "は一覧にありません。",
        "invalid": "は不正な値です。",
        "invalid_csv": "CSV形式のファイルを選択してください。",
        "invalid_email_included": "に不正なメールアドレスが含まれています。",
        "invalid_file_type": "は不正なファイル形式です。",
        "invalid_filename": "は半角英数、アンダースコア、ハイフンのみ使用可能です。",
        "invalid_updated": "他のユーザーによって更新されています。編集をやり直してください。",
        "invalid_word": "に無効な語句\"%{word}\"が含まれています。",
        "less_than": "は%{count}より小さい値にしてください。",
        "less_than_or_equal_to": "は%{count}以下の値にしてください。",
        "locked": "「%{user}」さんが編集中のため、編集・削除・移動ができません。",
        "malformed_csv": "CSVの形式が正しくありません。正しい形式のCSVファイルを選択してください。",
        "malformed_kana_dictionary": "書式が不正です: %{line}(%{no})",
        "malformed_liquid_template": "の形式が正しくありません。%{error}",
        "not_a_number": "は数値で入力してください。",
        "not_an_integer": "は整数で入力してください。",
        "not_exist": "は存在しません。",
        "not_found_group": "グループ「%{name}」が見つかりません。",
        "not_found_gws_role": "グループウェア権限「%{name}」が見つかりません。",
        "not_found_main_group": "グループ（主）「%{name}」が見つかりません。",
        "not_found_parent_nodes": "に親フォルダー「%{name}」がありません。",
        "not_found_sys_role": "システム権限「%{name}」が見つかりません。",
        "not_found_user_title": "役職コード「%{code}」が見つかりません。",
        "not_found_webmail_role": "ウェブメール権限「%{name}」が見つかりません。",
        "odd": "は奇数にしてください。",
        "other_than": "は%{count}以外の値にしてください。",
        "present": "は入力しないでください。",
        "record_invalid": "バリデーションに失敗しました。 %{errors}",
        "request_entity_too_large": "データのサイズが大きすぎます。",
        "restrict_dependent_destroy": "%{record}が存在しているので削除できません。",
        "root_node_save_error": "ルートフォルダーを作成できませんでした。",
        "self_user": "ログイン中のユーザーを削除することはできません。",
        "smtp_delivery_error": "メールを送信できませんでした。STMPエラーメッセージ： %{message}",
        "taken": "はすでに存在します。",
        "too_large_file": "%{filename}(%{size}) のサイズが大きすぎます（制限値: %{limit}）。",
        "too_large_mail_size": "メールの添付ファイルサイズが大きすぎます。合計: %{size}（制限値: %{limit}）",
        "too_long": "は%{count}文字以内で入力してください。",
        "too_short": "は%{count}文字以上で入力してください。",
        "try_again_later": "時間を置いてもう一度お試しください。",
        "wrong_length": "は%{count}文字で入力してください。"
      },
      "template": {
        "body": "次の項目を確認してください。",
        "header": {
          "one": "登録内容を確認してください。",
          "other": "登録内容を確認してください。"
        }
      }
    }
  },
  "ads": {
    "access_log": "アクセス集計",
    "banner": "広告バナー",
    "options": {
      "link_action": {
        "cushion": "クッションページ",
        "direct": "直リンク"
      },
      "link_target": {
        "blank": "別のタブで表示",
        "self": "同じタブで表示"
      },
      "sort": {
        "order": "指定順",
        "random": "ランダム"
      }
    },
    "total": "合計",
    "yearly": "年間"
  },
  "all_content": {
    "category_ids": "カテゴリ",
    "close_date": "公開終了日時",
    "conditions": "検索条件(URL)",
    "created": "作成日時",
    "description": "概要",
    "file_size": "静的ファイル容量",
    "file_urls": "添付ファイルURL",
    "filename": "ファイル名",
    "files": "添付ファイル",
    "group_names": "管理グループ名",
    "index_name": "一覧用タイトル",
    "keywords": "キーワード",
    "layout": "レイアウト",
    "limit": "表示件数",
    "loop_html": "ループHTML",
    "loop_setting_id": "定義済みループHTML",
    "lower_html": "下部HTML",
    "name": "タイトル",
    "new_days": "NEWマーク期間",
    "node_id": "フォルダーID",
    "page_id": "ページID",
    "release_date": "公開開始日時",
    "released": "公開日時",
    "route": "登録種別 (ページ属性等)",
    "sort": "並び順",
    "status": "公開状態",
    "summary_html": "サマリー",
    "updated": "更新日時",
    "upper_html": "上部HTML",
    "url": "URL",
    "use_map": "地図のマーカー座標"
  },
  "article": {
    "page": "記事ページ",
    "page_navi": {
      "back_to_index": "一覧へ戻る",
      "next": "次のページ",
      "prev": "前のページ"
    }
  },
  "board": {
    "anpi_post": "安否投稿",
    "board": "掲示板",
    "buttons": {
      "search_person": "人を探す"
    },
    "cannot_use": "（公開側使用不可）",
    "errors": {
      "invalid_delete_key": "を英数4文字で入力してください。",
      "invalid_file_ext": "%{ext}形式のファイルを添付することはできません。",
      "not_allow_urls": "にURLを含めることはできません。",
      "not_same_delete_key": "削除キーが違います。",
      "too_many_comments": "これ以上返信することはできません。",
      "too_many_files": "%{limit}つまでファイルを添付することができます。"
    },
    "options": {
      "deletable_post": {
        "disabled": "使用しない",
        "enabled": "使用する"
      },
      "deny_url": {
        "allow": "拒否しない",
        "deny": "拒否する"
      },
      "file_limit": {
        "1n": "1つまで",
        "2n": "2つまで",
        "3n": "3つまで",
        "none": "使用しない"
      },
      "file_scan": {
        "disabled": "使用しない",
        "enabled": "使用する"
      },
      "file_size_limit": {
        "100MB": "100MB",
        "10MB": "10MB",
        "20MB": "20MB",
        "2MB": "2MB",
        "5MB": "5MB",
        "none": "制限しない"
      },
      "gpf_state": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "map_state": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "mode": {
        "thread": "スレッド形式",
        "tree": "ツリー形式"
      },
      "public_scope": {
        "group": "グループ内",
        "private": "非公開",
        "public": "全体に公開"
      },
      "show_email": {
        "disabled": "表示しない",
        "enabled": "表示する"
      },
      "show_url": {
        "disabled": "表示しない",
        "enabled": "表示する"
      },
      "text_size_limit": {
        "l0": "制限しない",
        "l400": "400文字まで"
      }
    },
    "post": "投稿",
    "views": {
      "date": "投稿日時：",
      "gpf": "Google Person Finder",
      "gpf_delete_info_html": "Google Person Finderに提供した安否情報を削除するには、<a target=\"_blank\" href=\"%{url}\">Google Person Finder 登録情報</a>にアクセスし削除してください。",
      "gps_position": "現在位置を取得する",
      "marker_clear": "マーカーをクリアする",
      "new": "新規投稿",
      "post_gpf": "Google Person Finderに安否情報を提供する",
      "poster": "投稿者：",
      "reply": "返信",
      "search": "検索",
      "search_person": "人を探す",
      "show_gpf": "Google Person Finderを表示する",
      "toggle": "展開",
      "unlimited": "制限なし"
    }
  },
  "category": {
    "name": "カテゴリー名",
    "node": "カテゴリー",
    "setting": "カテゴリー設定"
  },
  "chat": {
    "bot": "チャットボット",
    "first_suggest": "最初のサジェスト",
    "links": {
      "add_or_edit": "追加または編集する",
      "open_site_search": "サイト内検索の結果を開く"
    },
    "loop_intent": "循環参照されているシナリオです。",
    "not_found_intent": "返答またはサジェストを作成してください。",
    "options": {
      "question": {
        "retry": "いいえ",
        "success": "はい"
      }
    },
    "report": "レポート",
    "session_count": "セッション数"
  },
  "chorg": {
    "changeset": "組織変更内容",
    "import": {
      "changeset": {
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_tel": "電話番号",
        "destination": "操作先グループ名",
        "id": "ID",
        "ldap_dn": "DN",
        "order": "表示順",
        "source": "操作元グループ名",
        "type": "操作"
      }
    },
    "menus": {
      "revisions": {
        "add": "新設を追加する",
        "delete": "廃止を追加する",
        "division": "分割を追加する",
        "execute_results": "実行結果を閲覧する",
        "move": "移動を追加する",
        "production_execute": "本番実行する",
        "test_execute": "テスト実行する",
        "unify": "統合を追加する"
      }
    },
    "messages": {
      "import_revision_file_confirmation": "組織変更操作をCSVからインポートします。\\n既に操作が登録されている場合は削除されます。\\n実行してよろしいですか？",
      "job_reserved": "組織変更処理を予約しました。",
      "job_started": "組織変更処理を開始しました。",
      "test_run": "テスト実行"
    },
    "options": {
      "changeset_type": {
        "add": "新設",
        "delete": "廃止",
        "division": "分割",
        "move": "移動",
        "unify": "統合"
      },
      "delete_method": {
        "always_delete": "常に物理削除する",
        "disable_if_possible": "無効にし、後で回復できるようにする"
      }
    },
    "revision": "組織変更",
    "views": {
      "add_changesets": {
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_tel": "電話番号",
        "ldap_dn": "DN",
        "name": "グループ名",
        "order": "表示順"
      },
      "chorg/entity_log": {
        "close": "閉じる",
        "detail": "詳細",
        "id": "ID",
        "more": "もっと見る",
        "name": "名前",
        "operation": "変更",
        "options": {
          "operation": {
            "changes": "更新",
            "creates": "新規作成",
            "deletes": "削除"
          }
        }
      },
      "delete_changesets": {
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_tel": "電話番号",
        "ldap_dn": "DN",
        "name": "グループ名",
        "order": "表示順",
        "select_group": "廃止グループを選択する"
      },
      "division_changesets": {
        "after_division": {
          "one": "%{count} 番目の分割先",
          "other": "%{count} 番目の分割先",
          "zero": "分割先"
        },
        "before_division": "分割元",
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_tel": "電話番号",
        "ldap_dn": "DN",
        "name": "グループ名",
        "order": "表示順",
        "select_group": "分割グループを選択する"
      },
      "move_changesets": {
        "after_move": "移動先",
        "before_move": "移動元",
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_tel": "電話番号",
        "ldap_dn": "DN",
        "name": "グループ名",
        "order": "表示順",
        "select_group": "移動グループを選択する"
      },
      "revisions/edit": {
        "add": "新設",
        "add_description": "グループ名",
        "delete": "廃止",
        "delete_description": "グループ名",
        "division": "分割",
        "division_after": "分割先",
        "division_before": "分割元",
        "move": "移動",
        "move_after": "移動先",
        "move_before": "移動元",
        "unify": "統合",
        "unify_after": "統合先",
        "unify_before": "統合元"
      },
      "revisions/show": {
        "add": "新設",
        "add_description": "グループ名",
        "delete": "廃止",
        "delete_description": "グループ名",
        "division": "分割",
        "division_after": "分割先",
        "division_before": "分割元",
        "move": "移動",
        "move_after": "移動先",
        "move_before": "移動元",
        "unify": "統合",
        "unify_after": "統合先",
        "unify_before": "統合元"
      },
      "run/confirmation": {
        "main": {
          "header": "本番実行しますが、よろしいですか？",
          "run_button": "本番実行"
        },
        "run_options": "実行オプション",
        "test": {
          "header": "テスト実行しますが、よろしいですか？",
          "run_button": "テスト実行"
        }
      },
      "unify_changesets": {
        "after_unify": "統合先",
        "before_unify": "統合元",
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_tel": "電話番号",
        "ldap_dn": "DN",
        "name": "グループ名",
        "order": "表示順",
        "select_group": "統合グループを選択する"
      }
    }
  },
  "ckan": {
    "node": {
      "page": {
        "add": "データ追加",
        "update": "データ更新"
      }
    },
    "options": {
      "ckan_basicauth_state": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "ckan_status": {
        "dataset": "データセット",
        "group": "グループ",
        "organization": "組織",
        "related_item": "関連アイテム",
        "tag": "タグ"
      }
    }
  },
  "cms": {
    "add_max_file_size": "最大ファイルサイズを設定する",
    "adobe_reader": {
      "remark": [
        "<div>",
        "PDFファイルをご覧いただくためには、Adobe Readerのプラグイン（無償）が必要となります。",
        "お持ちでない場合は、お使いの機種とスペックに合わせたプラグインをインストールしてください。",
        "</div>",
        "<a href=\"http://get.adobe.com/jp/reader/\">Adobe Readerをダウンロードする</a>"
      ]
    },
    "alert": "警告",
    "all_content": {
      "download_description": "サイト内の全コンテンツを出力します。",
      "download_head": "全コンテンツ一覧出力",
      "download_tab": "一覧出力",
      "import_description": "サイト内の全コンテンツを一括して設定します。一括して設定できるのはフォルダーとページで、かつ設定可能な属性はタイトル、レイアウト、キーワード、概要、サマリー、カテゴリー、検索条件URL、並び順、表示件数、上部HTML、ループHTML、下部HTML、NEWマーク期間、管理グループです。",
      "import_head": "全コンテンツ一括設定",
      "import_tab": "一括設定"
    },
    "all_contents": "全コンテンツ",
    "apis": {
      "categories": {
        "index": "カテゴリーを選択する",
        "search": "カテゴリーを検索",
        "select": "カテゴリーを設定する"
      },
      "contents": {
        "confirm_message": "全置換を行ってもよろしいですか？",
        "keyword": "検索文字",
        "option": "オプション",
        "page": "ページ",
        "replacement": "置換文字",
        "result": "検索結果",
        "title": "タイトル"
      },
      "forms": {
        "index": "定形フォームを選択する",
        "search": "定形フォームを検索",
        "select": "定形フォームを設定する"
      },
      "members": {
        "index": "メンバーを選択する",
        "search": "メンバーを検索",
        "select": "メンバーを設定する"
      },
      "nodes": {
        "index": "フォルダーを選択する",
        "search": "フォルダーを検索",
        "select": "フォルダーを設定する"
      },
      "opendata_ref": {
        "datasets": {
          "index": "データセットを選択する",
          "search": "データセットを検索",
          "select": "データセットを設定する"
        }
      },
      "pages": {
        "index": "ページを選択する",
        "search": "ページを検索",
        "select": "ページを設定する"
      },
      "pages_routes": {
        "index": "ページ属性を選択する",
        "search": "ページ属性を検索",
        "select": "ページ属性を設定する"
      },
      "related_pages": {
        "index": "関連記事を選択する"
      },
      "sites": {
        "index": "サイトを選択する",
        "search": "サイトを検索",
        "select": "サイトを設定する"
      },
      "users": {
        "index": "ユーザーを選択する",
        "search": "ユーザーを検索",
        "select": "ユーザーを設定する"
      }
    },
    "auto_correct": {
      "caption": "キャプション",
      "link": "自動修正",
      "notice": "アクセシビリティチェック（保存時に自動で修正されます）"
    },
    "body_layout": "本文レイアウト",
    "buttons": {
      "add_crumb": "パンくずを追加する",
      "column_add_list": "リストを追加する",
      "ignore_alerts_and_save_as_branch": "警告を無視して差替保存",
      "manage_columns": "入力項目を管理する",
      "manage_init_columns": "初期ブロックを管理する",
      "save_as_branch": "差替保存",
      "send_verify_mail": "登録確認メールを送信する"
    },
    "calendar_view": "カレンダー表示",
    "check_links": "リンクチェック実行結果",
    "check_links_nodes": "フォルダー",
    "check_links_pages": "ページ",
    "column_file_upload": {
      "attachment": {
        "file_label": "ファイル名",
        "file_label_place_holder": "リンクテキストとして表示するファイル名を入力してください。"
      },
      "banner": {
        "file_label": "代替えテキスト",
        "file_label_place_holder": "代替えテキストを入力してください。",
        "link_url": "URL",
        "link_url_place_holder": "URLを入力してください。"
      },
      "image": {
        "file_label": "代替えテキスト",
        "file_label_place_holder": "代替えテキストを入力してください。"
      },
      "video": {
        "text": "動画の内容説明",
        "text_place_holder": "動画の内容を説明する文書を入力してください。"
      }
    },
    "column_table": {
      "cant_append_left": "ヘッダーの左側に列を追加することはできません。",
      "cant_append_top": "ヘッダーの上部に列を追加することはできません。",
      "caption": "キャプション",
      "create": "表を作成する",
      "header": "ヘッダ",
      "height": "行数",
      "width": "列数"
    },
    "column_value_error_template": "%{name}の%{error}",
    "column_youtube_auto_width": {
      "disabled": "画面幅に合わせない",
      "enabled": "画面幅に合わせる"
    },
    "columns": {
      "cms/check_box": "チェックボックス",
      "cms/date_field": "日付入力",
      "cms/file_upload": "ファイルアップロード",
      "cms/free": "自由入力",
      "cms/headline": "見出し入力",
      "cms/list": "リスト入力",
      "cms/radio_button": "ラジオボタン",
      "cms/select": "ドロップダウン",
      "cms/table": "表",
      "cms/text_area": "複数行入力",
      "cms/text_field": "一行入力",
      "cms/url_field": "URL入力",
      "cms/url_field2": "URL入力",
      "cms/youtube": "YouTube埋め込み"
    },
    "command": "コマンド",
    "config": "設定",
    "confirm": {
      "check_accessibility_manually": "セマンティックなマークアップであるか確認してください。\nコントラスト比に問題がないか確認してください。",
      "check_contains_urls": "このページへのリンクを確認する。",
      "close": "非公開状態で保存しようとしています",
      "contains_urls_exists": "このページへのリンク、関連記事、添付ファイルが以下のページに含まれています。",
      "contains_urls_not_found": "このページへのリンク、関連記事、添付ファイルが含まれているページは見つかりませんでした。",
      "convert_to_cms_page": "固定ページに変換してよろしいですか？",
      "converted_html": "取り込んだHTMLはWYSIWYGエディタ内に展開される為、HTMLが変換される可能性があります。",
      "delete_item": "項目を削除してよろしいですか？"
    },
    "content": "コンテンツ",
    "convert_to_cms_page": "固定ページに変換する",
    "copy_nodes": {
      "from": "複製元フォルダー",
      "job_history": "実行ログ",
      "link_to_job_history": "ジョブ実行履歴",
      "started_job": "処理を開始します。ジョブ実行履歴で結果をご確認下さい",
      "target_node_name": "フォルダー名",
      "to": "複製先"
    },
    "default_form": "既定のフォーム",
    "draft_page": "下書きページ",
    "editor_template": "テンプレート",
    "file": "共有ファイル",
    "form_check": "制約チェック",
    "form_not_selected": "定型フォームが選択されていません",
    "generate_node": "フォルダー書き出し",
    "generate_page": "ページ書き出し",
    "group": "グループ",
    "import_node": "フォルダー取り込み",
    "import_node_index": "取り込みフォルダー",
    "import_page": "取り込みページ",
    "import_page_index": "取り込みページ",
    "important_notice": "重要なお知らせ",
    "inplace_edit": "編集モード",
    "input_directly": "直接入力する",
    "layout": "レイアウト",
    "link_check": "リンクチェック",
    "links": {
      "back_to_contents": "コンテンツへ戻る",
      "ruby_off": "ふりがなをはずす",
      "ruby_on": "ふりがなをつける"
    },
    "list_view": "リスト表示",
    "loop_html": "ループHTML",
    "max_file_size": "最大ファイルサイズ",
    "max_file_size_setting": "最大ファイルサイズ設定",
    "member": "メンバー",
    "mobile_size_check": "携帯データサイズチェック",
    "modules": "モジュール",
    "move_page": {
      "confirm": "確認",
      "link_to_replace": "URLを置換する",
      "message": "\"%{source}\"へのリンクが含まれるページ"
    },
    "node": "フォルダー",
    "node_config": "フォルダー設定",
    "nodes": {
      "ads/banner": "広告バナー",
      "article/page": "記事リスト",
      "board/anpi_post": "安否掲示板",
      "board/post": "掲示板",
      "category/node": "カテゴリーリスト",
      "category/page": "ページリスト",
      "chat/bot": "チャットボット",
      "ckan/page": "新着",
      "cms/archive": "アーカイブ",
      "cms/group_page": "グループ別ページリスト",
      "cms/import_node": "取り込みページ",
      "cms/node": "フォルダーリスト",
      "cms/page": "ページリスト",
      "cms/photo_album": "写真一覧",
      "cms/site_search": "サイト内検索",
      "event/page": "イベントリスト",
      "event/search": "イベント検索",
      "ezine/backnumber": "バックナンバー",
      "ezine/category_node": "カテゴリ",
      "ezine/member_page": "会員向けメール配信",
      "ezine/page": "配信記事一覧",
      "facility/category": "施設の種類",
      "facility/location": "施設のある地域",
      "facility/node": "施設リスト",
      "facility/page": "施設情報",
      "facility/search": "施設検索",
      "facility/service": "施設の用途",
      "faq/page": "FAQ記事リスト",
      "faq/search": "FAQ記事検索",
      "garbage/category": "ゴミ品目カテゴリー",
      "garbage/node": "ゴミ品目リスト",
      "garbage/page": "ゴミ品目",
      "garbage/search": "ゴミ品目検索",
      "inquiry/form": "フォーム",
      "inquiry/node": "フォーム一覧",
      "key_visual/image": "画像管理",
      "mail_page/page": "メール取込",
      "member/blog": "ブログ",
      "member/blog_page_location": "ブログの地域",
      "member/login": "ログイン",
      "member/my_anpi_post": "安否",
      "member/my_blog": "マイブログ",
      "member/my_group": "グループ",
      "member/my_photo": "マイフォト",
      "member/my_profile": "プロフィール",
      "member/mypage": "マイページ",
      "member/photo": "フォト",
      "member/photo_category": "フォトカテゴリー",
      "member/photo_location": "フォトロケーション",
      "member/photo_search": "フォトサーチ",
      "member/photo_spot": "フォトスポット",
      "member/registration": "会員登録",
      "opendata/api": "API",
      "opendata/app": "アプリ",
      "opendata/app_category": "アプリ分野",
      "opendata/area": "地域",
      "opendata/category": "分野",
      "opendata/dataset": "データセット",
      "opendata/dataset_area": "データセット地域",
      "opendata/dataset_category": "データセット分野",
      "opendata/dataset_estat_category": "データセットeStat分野",
      "opendata/dataset_map": "データセット地図",
      "opendata/estat_category": "eStat分野",
      "opendata/idea": "アイデアボックス",
      "opendata/idea_category": "アイデア分野",
      "opendata/member": "メンバー",
      "opendata/my_app": "マイアプリ",
      "opendata/my_dataset": "マイデータセット",
      "opendata/my_idea": "マイアイデア",
      "opendata/my_profile": "マイプロフィール",
      "opendata/mypage": "マイページ",
      "opendata/search_app": "アプリ検索",
      "opendata/search_dataset": "データセット検索",
      "opendata/search_dataset_group": "データセットグループ検索",
      "opendata/search_idea": "アイデア検索",
      "opendata/sparql": "SPARQL",
      "recommend/receiver": "閲覧履歴受信",
      "rss/page": "RSS取込",
      "rss/weather_xml": "気象庁防災情報XML",
      "sitemap/page": "サイトマップ",
      "uploader/file": "アップローダー",
      "urgency/layout": "緊急災害レイアウト"
    },
    "notice": "お知らせ",
    "notices": {
      "import_with_entry_form_is_not_supported": "次のフォームでは本文ブロックは出力されません。"
    },
    "opendata_ref/license": {
      "ref_opendata": "オープンデータ側の設定にしたがう"
    },
    "opendata_ref/resource": {
      "license_id": "ライセンス",
      "ref_opendata_license": "オープンデータ側の既定値",
      "state": "登録方法",
      "text": "説明"
    },
    "options": {
      "action_type": {
        "remove": "削除",
        "replace": "置換"
      },
      "alignment": {
        "center": "中央",
        "flow": "自動",
        "left": "左",
        "right": "右"
      },
      "column_file_type": {
        "attachment": "添付ファイル",
        "banner": "バナー",
        "image": "画像",
        "video": "動画"
      },
      "column_header_type": {
        "left": "左側",
        "none": "なし",
        "top": "上部",
        "top-left": "上部と左側"
      },
      "column_image_html_type": {
        "image": "画像貼付",
        "thumb": "サムネイル"
      },
      "column_input_type": {
        "email": "メールアドレス",
        "tel": "電話番号",
        "text": "テキスト"
      },
      "column_list_type": {
        "ol": "番号付きリスト",
        "ul": "番号なしリスト"
      },
      "form_sub_type": {
        "entry": "ブロック型入力",
        "static": "定型フォーム"
      },
      "loop_format": {
        "liquid": "Liquid",
        "shirasagi": "SHIRASAGI"
      },
      "max_name_length": {
        "0": "無制限",
        "80": "80文字"
      },
      "member_state": {
        "disabled": "無効",
        "enabled": "有効",
        "temporary": "仮登録"
      },
      "node_target": {
        "current": "このフォルダーから",
        "descendant": "このフォルダー以下から"
      },
      "notice_severity": {
        "high": "重要なお知らせ",
        "normal": ""
      },
      "notice_target": {
        "all": "全ユーザー",
        "cms_admin": "CMS管理画面",
        "gw_admin": "グループウェア",
        "login_view": "ログイン画面",
        "same_group": "管理グループのみ",
        "sys_admin": "システム管理画面",
        "webmail_admin": "ウェブメール"
      },
      "opendata_dataset": {
        "closed": "データセット（非公開）で登録する",
        "existance": "既存のデータセットに登録する",
        "none": "データセットとして登録しない",
        "public": "データセット（公開）で登録する"
      },
      "opendata_resource": {
        "existance": "既存のデータセット内",
        "none": "リソースとして登録しない",
        "same": "記事と同じデータセット内"
      },
      "parent_crumb": {
        "blank": "カテゴリーから選択する"
      },
      "readable_setting_range": {
        "public": "全公開",
        "select": "選択範囲"
      },
      "search_date": {
        "absolute": "日付範囲",
        "relative": "経過日"
      },
      "sort": {
        "approved_1": "承認日時",
        "created": "作成日時",
        "filename": "ファイル名",
        "name": "タイトル",
        "order": "指定順",
        "released_1": "公開日時",
        "updated_1": "更新日時"
      },
      "state": {
        "disabled": "使用しない",
        "enabled": "使用する"
      },
      "target_type": {
        "attribute": "属性",
        "regexp": "正規表現",
        "string": "文字列",
        "tag": "タグ"
      }
    },
    "page": "固定ページ",
    "page_search": "ページ検索",
    "part": "パーツ",
    "parts": {
      "ads/banner": "広告バナー",
      "article/page": "記事リスト",
      "article/page_navi": "記事ナビゲーション",
      "category/node": "カテゴリーリスト",
      "chat/bot": "チャットボット",
      "ckan/page": "ページリスト",
      "ckan/reference": "参照（ハーベスト）",
      "ckan/status": "件数",
      "cms/calendar_nav": "アーカイブナビ(カレンダー)",
      "cms/crumb": "パンくずリスト",
      "cms/free": "HTML記述",
      "cms/monthly_nav": "アーカイブナビ（月次）",
      "cms/node": "フォルダーリスト",
      "cms/page": "ページリスト",
      "cms/sns_share": "SNSシェアボタン",
      "cms/tabs": "新着タブ",
      "event/calendar": "カレンダー",
      "event/search": "イベント検索",
      "faq/search": "FAQ記事検索",
      "inquiry/feedback": "フィードバック",
      "key_visual/slide": "スライドショー",
      "mail_page/page": "緊急情報",
      "member/blog_page": "ブログページ一覧",
      "member/invited_group": "招待されたグループ",
      "member/login": "ログイン",
      "member/photo": "フォト一覧",
      "member/photo_search": "フォトサーチ",
      "member/photo_slide": "フォトスライド",
      "opendata/app": "アプリ",
      "opendata/dataset": "データセット",
      "opendata/dataset_counter": "データセットカウンター",
      "opendata/dataset_group": "データセットグループ",
      "opendata/idea": "アイデア",
      "opendata/mypage_login": "ログイン",
      "recommend/history": "閲覧履歴",
      "recommend/similarity": "関連ページ"
    },
    "preview": "プレビュー",
    "preview_date": "プレビュー日時",
    "preview_mobile_page": "携帯プレビュー",
    "preview_page": "プレビュー",
    "preview_pc_page": "PCプレビュー",
    "preview_site": "サイトプレビュー",
    "role": "権限/ロール",
    "roles": {
      "admin": "管理者",
      "user": "編集者"
    },
    "root_menu": "メインメニュー",
    "search_contents": "サイト内検索",
    "search_contents_condition": "検索条件: %{condition}",
    "search_contents_count": "%{count} 件の検索結果",
    "search_contents_files": "ファイル一覧",
    "search_contents_html": "HTML検索と置換",
    "search_contents_pages": "ページ検索",
    "show_link_to_part": "パーツのリンクを表示",
    "site": "サイト",
    "site_config": "サイト設定",
    "site_info": "サイト情報",
    "site_menu": "サイトメニュー",
    "sns_share": {
      "fb_lang": "ja_JP",
      "fb_like": "Facebook いいね！",
      "fb_share": "Facebook シェア",
      "hatena": "はてなブックマーク",
      "hatena_add": "このエントリーをはてなブックマークに追加",
      "line": "LINEで送る",
      "tweet": "ツイート",
      "twitter": "Twitter"
    },
    "source_cleaner": "ソースクリーニング",
    "source_cleaner_template": "ソースクリーニング",
    "syntax_check": "アクセシビリティチェック",
    "theme_template": "Theme切り替え",
    "user": "ユーザー",
    "view_page": "公開画面",
    "view_site": "サイト確認",
    "word_dictionary": "単語置換辞書"
  },
  "cms_role": {
    "approve_member_opendata_apps": "アプリの承認（メンバー）",
    "approve_member_opendata_datasets": "データセットの承認（メンバー）",
    "approve_member_opendata_ideas": "アイデアの承認（メンバー）",
    "approve_other_article_pages": "ページの承認（全て）",
    "approve_other_cms_pages": "固定ページの承認（全て）",
    "approve_other_event_pages": "ページの承認（全て）",
    "approve_other_faq_pages": "ページの承認（全て）",
    "approve_other_member_blogs": "メンバーブログの承認（全て）",
    "approve_other_member_photos": "メンバーフォトの承認（全て）",
    "approve_other_opendata_apps": "アプリの承認（全て）",
    "approve_other_opendata_datasets": "データセットの承認（全て）",
    "approve_other_opendata_ideas": "アイデアの承認（全て）",
    "approve_other_sitemap_pages": "ページの承認（全て）",
    "approve_private_article_pages": "ページの承認（所有）",
    "approve_private_cms_pages": "固定ページの承認（所有）",
    "approve_private_event_pages": "ページの承認（所有）",
    "approve_private_faq_pages": "ページの承認（所有）",
    "approve_private_member_blogs": "メンバーブログの承認（所有）",
    "approve_private_member_photos": "メンバーフォトの承認（所有）",
    "approve_private_opendata_apps": "アプリの承認（所有）",
    "approve_private_opendata_datasets": "データセットの承認（所有）",
    "approve_private_opendata_ideas": "アイデアの承認（所有）",
    "approve_private_sitemap_pages": "ページの承認（所有）",
    "build_kana_dictionaries": "かな辞書の反映",
    "delete_board_anpi_posts": "安否の削除",
    "delete_board_posts": "投稿の削除",
    "delete_cms_body_layouts": "本文レイアウトの削除",
    "delete_cms_commands": "コマンドの削除",
    "delete_history_trashes": "ゴミ箱の完全削除",
    "delete_kana_dictionaries": "かな辞書の削除",
    "delete_member_opendata_apps": "アプリの削除（メンバー）",
    "delete_member_opendata_datasets": "データセットの削除（メンバー）",
    "delete_member_opendata_ideas": "アイデアの削除（メンバー）",
    "delete_other_ads_banners": "バナーの削除（全て）",
    "delete_other_article_pages": "ページの削除（全て）",
    "delete_other_chat_bots": "チャットボットの削除(全て)",
    "delete_other_cms_files": "共有ファイルの削除（全て）",
    "delete_other_cms_forms": "定型フォームの削除（全て）",
    "delete_other_cms_layouts": "レイアウトの削除（全て）",
    "delete_other_cms_nodes": "フォルダーの削除（全て）",
    "delete_other_cms_notices": "お知らせの削除（全て）",
    "delete_other_cms_page_searches": "ページ検索の削除（全て）",
    "delete_other_cms_pages": "固定ページの削除（全て）",
    "delete_other_cms_parts": "パーツの削除（全て）",
    "delete_other_event_pages": "ページの削除（全て）",
    "delete_other_faq_pages": "ページの削除（全て）",
    "delete_other_key_visual_images": "画像の削除（全て）",
    "delete_other_member_blogs": "メンバーブログの削除（全て）",
    "delete_other_member_photos": "メンバーフォトの削除（全て）",
    "delete_other_opendata_apps": "アプリの削除（全て）",
    "delete_other_opendata_datasets": "データセットの削除（全て）",
    "delete_other_opendata_ideas": "アイデアの削除（全て）",
    "delete_other_sitemap_pages": "ページの削除（全て）",
    "delete_other_workflow_routes": "承認ルートの削除（全て）",
    "delete_private_ads_banners": "バナーの削除（所有）",
    "delete_private_article_pages": "ページの削除（所有）",
    "delete_private_chat_bots": "チャットボットの削除(所有)",
    "delete_private_cms_files": "共有ファイルの削除（所有）",
    "delete_private_cms_forms": "定型フォームの削除（所有）",
    "delete_private_cms_layouts": "レイアウトの削除（所有）",
    "delete_private_cms_nodes": "フォルダーの削除（所有）",
    "delete_private_cms_notices": "お知らせの削除（所有）",
    "delete_private_cms_page_searches": "ページ検索の削除（所有）",
    "delete_private_cms_pages": "固定ページの削除（所有）",
    "delete_private_cms_parts": "パーツの削除（所有）",
    "delete_private_event_pages": "ページの削除（所有）",
    "delete_private_faq_pages": "ページの削除（所有）",
    "delete_private_key_visual_images": "画像の削除（所有）",
    "delete_private_member_blogs": "メンバーブログの削除（所有）",
    "delete_private_member_photos": "メンバーフォトの削除（所有）",
    "delete_private_opendata_apps": "アプリの削除（所有）",
    "delete_private_opendata_datasets": "データセットの削除（所有）",
    "delete_private_opendata_ideas": "アイデアの削除（所有）",
    "delete_private_sitemap_pages": "ページの削除（所有）",
    "delete_private_workflow_routes": "承認ルートの削除（所有）",
    "edit_board_anpi_posts": "安否の編集",
    "edit_board_posts": "投稿の編集",
    "edit_chorg_revisions": "組織変更の管理",
    "edit_cms_body_layouts": "本文レイアウトの編集",
    "edit_cms_commands": "コマンドの編集",
    "edit_cms_editor_templates": "テンプレートの管理",
    "edit_cms_groups": "グループの管理",
    "edit_cms_loop_settings": "ループHTMLの管理",
    "edit_cms_members": "メンバーの管理",
    "edit_cms_roles": "権限/ロールの管理",
    "edit_cms_sites": "サイトの管理",
    "edit_cms_users": "ユーザーの管理",
    "edit_history_trashes": "ゴミ箱の復元",
    "edit_kana_dictionaries": "かな辞書の編集",
    "edit_member_opendata_apps": "アプリの編集（メンバー）",
    "edit_member_opendata_datasets": "データセットの編集（メンバー）",
    "edit_member_opendata_ideas": "アイデアの編集（メンバー）",
    "edit_other_ads_banners": "バナーの編集（全て）",
    "edit_other_article_pages": "ページの編集（全て）",
    "edit_other_chat_bots": "チャットボットの編集(全て)",
    "edit_other_cms_files": "共有ファイルの編集（全て）",
    "edit_other_cms_forms": "定型フォームの管理（全て）",
    "edit_other_cms_layouts": "レイアウトの編集（全て）",
    "edit_other_cms_nodes": "フォルダーの編集（全て）",
    "edit_other_cms_notices": "お知らせの編集（全て）",
    "edit_other_cms_page_searches": "ページ検索の編集（全て）",
    "edit_other_cms_pages": "固定ページの編集（全て）",
    "edit_other_cms_parts": "パーツの編集（全て）",
    "edit_other_event_pages": "ページの編集（全て）",
    "edit_other_faq_pages": "ページの編集（全て）",
    "edit_other_key_visual_images": "画像の編集（全て）",
    "edit_other_member_blogs": "メンバーブログの編集（全て）",
    "edit_other_member_photos": "メンバーフォトの編集（全て）",
    "edit_other_opendata_apps": "アプリの編集（全て）",
    "edit_other_opendata_datasets": "データセットの編集（全て）",
    "edit_other_opendata_harvested": "ハーベスト機能の取込みデータセット強制編集",
    "edit_other_opendata_harvests": "ハーベスト機能の利用",
    "edit_other_opendata_ideas": "アイデアの編集（全て）",
    "edit_other_opendata_public_entity_datasets": "データセット一覧ダウンロードの利用",
    "edit_other_sitemap_pages": "ページの編集（全て）",
    "edit_other_workflow_routes": "承認ルートの編集（全て）",
    "edit_private_ads_banners": "バナーの編集（所有）",
    "edit_private_article_pages": "ページの編集（所有）",
    "edit_private_chat_bots": "チャットボットの編集(所有)",
    "edit_private_cms_files": "共有ファイルの編集（所有）",
    "edit_private_cms_forms": "定型フォームの管理（所有）",
    "edit_private_cms_layouts": "レイアウトの編集（所有）",
    "edit_private_cms_nodes": "フォルダーの編集（所有）",
    "edit_private_cms_notices": "お知らせの編集（所有）",
    "edit_private_cms_page_searches": "ページ検索の編集（所有）",
    "edit_private_cms_pages": "固定ページの編集（所有）",
    "edit_private_cms_parts": "パーツの編集（所有）",
    "edit_private_event_pages": "ページの編集（所有）",
    "edit_private_faq_pages": "ページの編集（所有）",
    "edit_private_key_visual_images": "画像の編集（所有）",
    "edit_private_member_blogs": "メンバーブログの編集（所有）",
    "edit_private_member_photos": "メンバーフォトの編集（所有）",
    "edit_private_opendata_apps": "アプリの編集（所有）",
    "edit_private_opendata_datasets": "データセットの編集（所有）",
    "edit_private_opendata_ideas": "アイデアの編集（所有）",
    "edit_private_sitemap_pages": "ページの編集（所有）",
    "edit_private_workflow_routes": "承認ルートの編集（所有）",
    "import_other_article_pages": "ページのインポート（全て）",
    "import_other_chat_bots": "チャットボットのインポート(全て)",
    "import_other_cms_nodes": "フォルダーのインポート（全て）",
    "import_other_event_pages": "ページのインポート（全て）",
    "import_other_faq_pages": "ページのインポート（全て）",
    "import_other_opendata_datasets": "データセットのインポート",
    "import_private_article_pages": "ページのインポート（所有）",
    "import_private_chat_bots": "チャットボットのインポート(所有)",
    "import_private_cms_nodes": "フォルダーのインポート（所有）",
    "import_private_event_pages": "ページのインポート（所有）",
    "import_private_faq_pages": "ページのインポート（所有）",
    "move_other_article_pages": "ページの移動（全て）",
    "move_other_cms_nodes": "フォルダーの移動（全て）",
    "move_other_cms_pages": "固定ページの移動（全て）",
    "move_other_event_pages": "ページの移動（全て）",
    "move_other_faq_pages": "ページの移動（全て）",
    "move_other_sitemap_pages": "ページの移動（全て）",
    "move_private_article_pages": "ページの移動（所有）",
    "move_private_cms_nodes": "フォルダーの移動（所有）",
    "move_private_cms_pages": "固定ページの移動（所有）",
    "move_private_event_pages": "ページの移動（所有）",
    "move_private_faq_pages": "ページの移動（所有）",
    "move_private_sitemap_pages": "ページの移動（所有）",
    "read_board_anpi_posts": "安否の閲覧",
    "read_board_posts": "投稿の閲覧",
    "read_cms_body_layouts": "本文レイアウトの閲覧",
    "read_cms_commands": "コマンドの閲覧",
    "read_history_trashes": "ゴミ箱の閲覧",
    "read_kana_dictionaries": "かな辞書の閲覧",
    "read_member_opendata_apps": "アプリの閲覧（メンバー）",
    "read_member_opendata_datasets": "データセットの閲覧（メンバー）",
    "read_member_opendata_ideas": "アイデアの閲覧（メンバー）",
    "read_other_ads_banners": "バナーの閲覧（全て）",
    "read_other_article_pages": "ページの閲覧（全て）",
    "read_other_chat_bots": "チャットボットの閲覧(全て)",
    "read_other_cms_files": "共有ファイルの閲覧（全て）",
    "read_other_cms_forms": "定型フォームの閲覧（全て）",
    "read_other_cms_layouts": "レイアウトの閲覧（全て）",
    "read_other_cms_nodes": "フォルダーの閲覧（全て）",
    "read_other_cms_notices": "お知らせの閲覧（全て）",
    "read_other_cms_page_searches": "ページ検索の閲覧（全て）",
    "read_other_cms_pages": "固定ページの閲覧（全て）",
    "read_other_cms_parts": "パーツの閲覧（全て）",
    "read_other_event_pages": "ページの閲覧（全て）",
    "read_other_faq_pages": "ページの閲覧（全て）",
    "read_other_key_visual_images": "画像の閲覧（全て）",
    "read_other_member_blogs": "メンバーブログの閲覧（全て）",
    "read_other_member_photos": "メンバーフォトの閲覧（全て）",
    "read_other_opendata_apps": "アプリの閲覧（全て）",
    "read_other_opendata_datasets": "データセットの閲覧（全て）",
    "read_other_opendata_ideas": "アイデアの閲覧（全て）",
    "read_other_sitemap_pages": "ページの閲覧（全て）",
    "read_other_workflow_routes": "承認ルートの閲覧（全て）",
    "read_private_ads_banners": "バナーの閲覧（所有）",
    "read_private_article_pages": "ページの閲覧（所有）",
    "read_private_chat_bots": "チャットボットの閲覧(所有)",
    "read_private_cms_files": "共有ファイルの閲覧（所有）",
    "read_private_cms_forms": "定型フォームの閲覧（所有）",
    "read_private_cms_layouts": "レイアウトの閲覧（所有）",
    "read_private_cms_nodes": "フォルダーの閲覧（所有）",
    "read_private_cms_notices": "お知らせの閲覧（所有）",
    "read_private_cms_page_searches": "ページ検索の閲覧（所有）",
    "read_private_cms_pages": "固定ページの閲覧（所有）",
    "read_private_cms_parts": "パーツの閲覧（所有）",
    "read_private_event_pages": "ページの閲覧（所有）",
    "read_private_faq_pages": "ページの閲覧（所有）",
    "read_private_key_visual_images": "画像の閲覧（所有）",
    "read_private_member_blogs": "メンバーブログの閲覧（所有）",
    "read_private_member_photos": "メンバーフォトの閲覧（所有）",
    "read_private_opendata_apps": "アプリの閲覧（所有）",
    "read_private_opendata_datasets": "データセットの閲覧（所有）",
    "read_private_opendata_ideas": "アイデアの閲覧（所有）",
    "read_private_sitemap_pages": "ページの閲覧（所有）",
    "read_private_workflow_routes": "承認ルートの閲覧（所有）",
    "release_member_opendata_apps": "アプリの公開（メンバー）",
    "release_member_opendata_datasets": "データセットの公開（メンバー）",
    "release_member_opendata_ideas": "アイデアの公開（メンバー）",
    "release_other_article_pages": "ページの公開（全て）",
    "release_other_cms_pages": "固定ページの公開（全て）",
    "release_other_event_pages": "ページの公開（全て）",
    "release_other_faq_pages": "ページの公開（全て）",
    "release_other_member_blogs": "メンバーブログの公開（全て）",
    "release_other_member_photos": "メンバーフォトの公開（全て）",
    "release_other_opendata_apps": "アプリの公開（全て）",
    "release_other_opendata_datasets": "データセットの公開（全て）",
    "release_other_opendata_ideas": "アイデアの公開（全て）",
    "release_other_sitemap_pages": "ページの公開（全て）",
    "release_private_article_pages": "ページの公開（所有）",
    "release_private_cms_pages": "固定ページの公開（所有）",
    "release_private_event_pages": "ページの公開（所有）",
    "release_private_faq_pages": "ページの公開（所有）",
    "release_private_member_blogs": "メンバーブログの公開（所有）",
    "release_private_member_photos": "メンバーフォトの公開（所有）",
    "release_private_opendata_apps": "アプリの公開（所有）",
    "release_private_opendata_datasets": "データセットの公開（所有）",
    "release_private_opendata_ideas": "アイデアの公開（所有）",
    "release_private_sitemap_pages": "ページの公開（所有）",
    "reroute_other_article_pages": "ページの承認経路変更（全て）",
    "reroute_other_cms_pages": "固定ページの承認経路変更（全て）",
    "reroute_other_event_pages": "ページの承認経路変更（全て）",
    "reroute_other_faq_pages": "ページの承認経路変更（全て）",
    "reroute_other_member_blogs": "メンバーブログの承認申請取消（全て）",
    "reroute_other_member_photos": "メンバーフォトの承認申請取消（全て）",
    "reroute_other_opendata_apps": "アプリの承認経路変更（全て）",
    "reroute_other_opendata_datasets": "データセットの承認経路変更（全て）",
    "reroute_other_opendata_ideas": "アイデアの承認経路変更（全て）",
    "reroute_other_sitemap_pages": "ページの承認経路変更（全て）",
    "reroute_private_article_pages": "ページの承認経路変更（所有）",
    "reroute_private_cms_pages": "固定ページの承認経路変更（所有）",
    "reroute_private_event_pages": "ページの承認経路変更（所有）",
    "reroute_private_faq_pages": "ページの承認経路変更（所有）",
    "reroute_private_member_blogs": "メンバーブログの承認申請取消（所有）",
    "reroute_private_member_photos": "メンバーフォトの承認申請取消（所有）",
    "reroute_private_opendata_apps": "アプリの承認経路変更（所有）",
    "reroute_private_opendata_datasets": "データセットの承認経路変更（所有）",
    "reroute_private_opendata_ideas": "アイデアの承認経路変更（所有）",
    "reroute_private_sitemap_pages": "ページの承認経路変更（所有）",
    "revoke_other_article_pages": "ページの承認申請取消（全て）",
    "revoke_other_cms_pages": "固定ページの承認申請取消（全て）",
    "revoke_other_event_pages": "ページの承認申請取消（全て）",
    "revoke_other_faq_pages": "ページの承認申請取消（全て）",
    "revoke_other_member_blogs": "メンバーブログの承認経路変更（全て）",
    "revoke_other_member_photos": "メンバーフォトの承認経路変更（全て）",
    "revoke_other_opendata_apps": "アプリの承認申請取消（全て）",
    "revoke_other_opendata_datasets": "データセットの承認申請取消（全て）",
    "revoke_other_opendata_ideas": "アイデアの承認申請取消（全て）",
    "revoke_other_sitemap_pages": "ページの承認申請取消（全て）",
    "revoke_private_article_pages": "ページの承認申請取消（所有）",
    "revoke_private_cms_pages": "固定ページの承認申請取消（所有）",
    "revoke_private_event_pages": "ページの承認申請取消（所有）",
    "revoke_private_faq_pages": "ページの承認申請取消（所有）",
    "revoke_private_member_blogs": "メンバーブログの承認経路変更（所有）",
    "revoke_private_member_photos": "メンバーフォトの承認経路変更（所有）",
    "revoke_private_opendata_apps": "アプリの承認申請取消（所有）",
    "revoke_private_opendata_datasets": "データセットの承認申請取消（所有）",
    "revoke_private_opendata_ideas": "アイデアの承認申請取消（所有）",
    "revoke_private_sitemap_pages": "ページの承認申請取消（所有）",
    "unlock_other_article_pages": "ページのロック解除（全て）",
    "unlock_other_cms_pages": "固定ページのロック解除（全て）",
    "unlock_other_faq_pages": "ページのロック解除（全て）",
    "use_cms_commands": "コマンドの実行",
    "use_cms_editor_extensions": "エディターの高度な利用",
    "use_cms_tools": "運用ツールの利用"
  },
  "contact": {
    "charge": "担当",
    "email": "メールアドレス",
    "fax": "ファックス番号",
    "group_name": "グループ",
    "link_name": "リンク名",
    "link_url": "リンクURL",
    "search_groups": {
      "index": "連絡先グループを選択する",
      "search": "連絡先グループを検索",
      "select": "連絡先グループを設定する"
    },
    "state": {
      "hide": "非表示",
      "show": "表示"
    },
    "tel": "電話番号",
    "view": {
      "email": "E-Mail",
      "fax": "Fax",
      "link_name": "リンク名",
      "link_url": "リンクURL",
      "tel": "電話",
      "title": "お問い合わせ"
    }
  },
  "date": {
    "abbr_day_names": [
      "日",
      "月",
      "火",
      "水",
      "木",
      "金",
      "土"
    ],
    "abbr_month_names": [
      null,
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    "day_names": [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日"
    ],
    "formats": {
      "attendance_month_day": "%1m月%1d日 (%a)",
      "attendance_year_month": "%Y年%1m月",
      "default": "%Y/%1m/%1d",
      "default_full": "%Y/%1m/%1d (%a)",
      "full": "%Y年%1m月%1d日 (%a)",
      "gws_long": "%Y年 %1m月%1d日 (%a)",
      "iso": "%Y-%m-%d",
      "iso_full": "%Y-%m-%d (%a)",
      "iso_month": "%Y-%m",
      "long": "%Y年%1m月%1d日",
      "long_month": "%Y年%1m月",
      "month": "%Y/%1m",
      "picker": "%Y/%m/%d",
      "short": "%1m/%1d"
    },
    "month_names": [
      null,
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    "order": [
      "year",
      "month",
      "day"
    ]
  },
  "datetime": {
    "distance_in_words": {
      "about_x_hours": {
        "one": "約1時間",
        "other": "約%{count}時間"
      },
      "about_x_months": {
        "one": "約1ヶ月",
        "other": "約%{count}ヶ月"
      },
      "about_x_years": {
        "one": "約1年",
        "other": "約%{count}年"
      },
      "almost_x_years": {
        "one": "1年弱",
        "other": "%{count}年弱"
      },
      "half_a_minute": "30秒前後",
      "less_than_x_minutes": {
        "one": "1分以内",
        "other": "%{count}分未満"
      },
      "less_than_x_seconds": {
        "one": "1秒以内",
        "other": "%{count}秒未満"
      },
      "over_x_years": {
        "one": "1年以上",
        "other": "%{count}年以上"
      },
      "x_days": {
        "one": "1日",
        "other": "%{count}日"
      },
      "x_minutes": {
        "one": "1分",
        "other": "%{count}分"
      },
      "x_months": {
        "one": "1ヶ月",
        "other": "%{count}ヶ月"
      },
      "x_seconds": {
        "one": "1秒",
        "other": "%{count}秒"
      }
    },
    "prompts": {
      "day": "日",
      "hour": "時",
      "milli_second": "ミリ秒",
      "minute": "分",
      "month": "月",
      "second": "秒",
      "wday": "曜日",
      "year": "年"
    }
  },
  "errors": {
    "dynamic_format": "%{message}",
    "format": "%{attribute}%{message}",
    "messages": {
      "accepted": "を受諾してください。",
      "already_registerd": "は、確認済みです。",
      "approvers_level_blank": "段が設定されていません。",
      "approvers_level_missing": "%{level} 段目の承認者を設定してください。",
      "approvers_user_id_blank": "ユーザが設定されていません。",
      "approvers_user_missing": "削除ユーザが存在します。",
      "auth_error": "権限がありません。",
      "blank": "を入力してください。",
      "blank_email": "キーワードが含まれる場合の通知メールアドレスを入力してください。",
      "blank_keyword": "通知メールアドレスに転送するキーワードを入力してください。",
      "branch_is_already_existed": "差し替えページが作成されています。",
      "branch_page_can_not_move": "差し替え用ページは移動できません。",
      "cannot_use_upload_file": "（ファイル投稿）は使用できません。",
      "check_embedded_media": "動画や音声を含む場合、説明があるか確認してください。",
      "check_html": "本文のアクセシビリティチェックを確認してください。",
      "check_interword_space": "単語の文字間のスペースを確認してください。",
      "check_link_text": "リンクのテキストを確認してください。",
      "check_object_text": "オブジェクト要素のボディに適切な代替テキストを記述してください。",
      "cloned_name": "タイトルに[複製]が含まれています。",
      "confirmation": "と%{attribute}の入力が一致しません。",
      "contact_system_administrator": "システム管理者にお問い合わせください。",
      "domain": "は有効なドメインを入力してください。",
      "duplicate": "の重複が存在します。",
      "email": "は有効な電子メールアドレスを入力してください。",
      "empty": "を入力してください。",
      "equal_to": "は%{count}にしてください。",
      "even": "は偶数にしてください。",
      "exclusion": "は予約されています。",
      "exist_form_select": "「%{input_type}」の項目はすでに存在しています。",
      "exist_physical_file": "移動先に物理ファイルが既に存在します。",
      "file_count": "ファイル数（%{size}）が多すぎます（制限値: %{limit}）。",
      "file_scan_exception": "ウイルススキャンに失敗しました。",
      "forced_update": "メールアドレスが未設定でも実行する。",
      "form_check_failed_to_connect": "内容チェックに失敗しました。次のURLに接続できません。",
      "greater_than": "は%{count}より大きい値にしてください。",
      "greater_than_or_equal_to": "は%{count}以上の値にしてください。",
      "include_not_general_sys_roles": "SYSロール「%{name}」は管理用の権限が含まれている為、設定できません。",
      "inclusion": "は一覧にありません。",
      "input_again": "をもう一度入力してください。",
      "input_confirm_not_match": "が一致しません。",
      "invalid": "は不正な値です。",
      "invalid_adjacent_a": "隣接する同じリンクを一つのリンクにまとめてください。",
      "invalid_approve_name": "複製後のタイトルを変更し承認申請を行ってください。",
      "invalid_csv": "CSV形式のファイルを選択してください。",
      "invalid_date_format": "日付の表記は○年○月○日としてください。",
      "invalid_email_included": "に不正なメールアドレスが含まれています。",
      "invalid_file_type": "は不正なファイル形式です。",
      "invalid_filename": "ファイル名は不正な値です。",
      "invalid_img_scheme": "画像のURIにバイナリー文字列が含まれています。",
      "invalid_input_type_for_input_confirm": "は、入力形式に「%{input_type}」が選択されている場合、「する」にできません。",
      "invalid_kana_character": "半角カナ文字が含まれています。",
      "invalid_multibyte_character": "英数字は半角文字を入力してください。",
      "invalid_order_of_h": "見出し(H)の順番が不正です。",
      "invalid_updated": "他のユーザーによって更新されています。編集をやり直してください。",
      "invalid_word": "に無効な語句\"%{word}\"が含まれています。",
      "less_than": "は%{count}より小さい値にしてください。",
      "less_than_or_equal_to": "は%{count}以下の値にしてください。",
      "level_blank": "のレベルが設定されていません。",
      "link_check_failed_to_connect": "リンクチェックに失敗しました。次のURLに接続できません。",
      "link_check_failure": "失敗",
      "link_check_success": "成功",
      "locked": "「%{user}」さんが編集中のため、編集・削除・移動ができません。",
      "malformed_csv": "CSVの形式が正しくありません。正しい形式のCSVファイルを選択してください。",
      "malformed_kana_dictionary": "書式が不正です: %{line}(%{no})",
      "malformed_liquid_template": "の形式が正しくありません。%{error}",
      "mismatch": "が一致しません。",
      "mobile_size_check_disable": "モバイルサイズが設定されていません。",
      "mobile_size_check_failed_to_size": "携帯で表示する場合、本文のデータサイズが%{mobile_size}以下になるようにしてください。",
      "mobile_size_check_failure": "失敗",
      "mobile_size_check_server_error": "本文データサイズのチェック中にサーバーエラーが発生しました。",
      "mobile_size_check_size": "本文のデータサイズはOKです。",
      "mobile_size_check_success": "成功",
      "model_invalid": "Validation failed: %{errors}",
      "no_approvers": "承認者がみつかりません。",
      "not_a_child_group": "はサイトに所属するグループを設定してください。",
      "not_a_number": "は数値で入力してください。",
      "not_an_integer": "は整数で入力してください。",
      "not_approve": "に設定されている %{name} は、承認権限がありません。",
      "not_cms_page_in_root": "固定ページ以外をルートに移動することはできません。",
      "not_exist": "は存在しません。",
      "not_found_group": "グループ「%{name}」が見つかりません。",
      "not_found_gws_role": "グループウェア権限「%{name}」が見つかりません。",
      "not_found_main_group": "グループ（主）「%{name}」が見つかりません。",
      "not_found_parent_group": "親グループが存在しません。",
      "not_found_parent_node": "移動先の親フォルダーが存在しません。",
      "not_found_parent_nodes": "に親フォルダー「%{name}」がありません。",
      "not_found_postal_code": "郵便番号が見つかりません",
      "not_found_sys_role": "システム権限「%{name}」が見つかりません。",
      "not_found_user_title": "役職コード「%{code}」が見つかりません。",
      "not_found_webmail_role": "ウェブメール権限「%{name}」が見つかりません。",
      "not_have_parent_read_permission": "移動先の親フォルダーの閲覧権限がありません。",
      "not_input": "を入力してください。",
      "not_read": "に設定されている %{name} は、閲覧権限がありません。",
      "not_registerd": "は登録されていません。",
      "not_select": "が選択されていません。",
      "odd": "は奇数にしてください。",
      "other_than": "は%{count}以外の値にしてください。",
      "partial_ancestor_error": "%{name}(%{filename}) : 対象フォルダーが統合元フォルダーの親フォルダーです。",
      "partial_auth_error": "%{name}(%{filename}) : 権限がありません。",
      "partial_children_basename_duplication": "%{name}(%{filename}) : 統合元フォルダーの下に同名のコンテンツがあります。",
      "partial_children_locked": "%{name}(%{filename}) : 編集ロックされています。",
      "partial_children_static_file_duplication": "%{file} : 統合元フォルダーの下に同名の静的ファイルがあります。",
      "partial_node_not_found": "フォルダーが見つかりません。",
      "password_alphabet_only": "に英字のみの文字は使用できません。",
      "password_contains_prohibited_chars": "は使用禁止文字が含まれています。",
      "password_include_email": "にメールアドレスが含まれています。",
      "password_include_kana": "によみがなが含まれています。",
      "password_include_name": "に氏名が含まれています。",
      "password_min_change_chars": "は以前のものから%{count}文字以上違う文字を含むようにしてください。",
      "password_numeric_only": "に数字のみの文字は使用できません。",
      "password_short": "は%{count}文字以上にしてください。",
      "password_short_digit": "は数字（0-9）を%{count}文字以上含むようにしてください。",
      "password_short_downcase": "は英小文字（a-z）を%{count}文字以上含むようにしてください。",
      "password_short_symbol": "は記号を%{count}文字以上含むようにしてください。",
      "password_short_upcase": "は英大文字（A-Z）を%{count}文字以上含むようにしてください。",
      "please_confirm_personal_data_protection": "個人情報の保護に同意してください。",
      "present": "は入力しないでください。",
      "record_invalid": "バリデーションに失敗しました。 %{errors}",
      "replace_word": "使用が好ましくない単語が含まれています。",
      "replace_word_validation": "に使用が好ましくない単語が含まれています。",
      "request_entity_too_large": "データのサイズが大きすぎます。",
      "required_count_greater_than_approvers": "%{level} 段目に設定されている承認者が、必要承認数 %{required_count} より少ないです。",
      "restrict_dependent_destroy": "%{record}が存在しているので削除できません。",
      "root_node_save_error": "ルートフォルダーを作成できませんでした。",
      "route_approver_unable_to_approve": "承認経路「%{route}」に設定されているユーザ「%{user}」は記事承認権がありません。",
      "route_approver_unable_to_read": "承認経路「%{route}」に設定されているユーザ「%{user} は記事閲覧権がありません。",
      "same_filename": "移動先と移動前が同じファイル名です。",
      "self_user": "ログイン中のユーザーを削除することはできません。",
      "set_applet_alt": "アプレット要素の代替テキストを確認してください。",
      "set_area_alt": "エリア要素の代替テキストを確認してください。",
      "set_filename": "ファイル名を入力してください。",
      "set_img_alt": "画像の代替テキストを確認してください。",
      "set_name": "タイトルを入力してください。",
      "set_table_caption": "表にキャプションが設定されていません。",
      "set_th_scope": "表のヘッダーにスコープ属性が設定されていません。",
      "smtp_delivery_error": "メールを送信できませんでした。STMPエラーメッセージ： %{message}",
      "state_blank": "の状態が設定されていません。",
      "subnode_of_itself": "移動先のフォルダーパスに自身のパスが含まれています。",
      "syntax_check_detail": {
        "check_embedded_media": [
          "動画や音声を本文に埋め込む場合は説明を記述してください。"
        ],
        "check_interword_space": [
          "単語の文字間に不要なスペースが含まれている場合は削除してください。"
        ],
        "check_link_text": [
          "リンク内のテキストは遷移先を表すものを設定してください。"
        ],
        "check_object_text": [
          "オブジェクト要素が正しく読み込まれなかった場合の説明を要素内に記述してください。"
        ],
        "invalid_adjacent_a": [
          "隣り合うリンク(A)に同じリンク先が設定されています。",
          "一つのリンク(A)にマークアップしてください。"
        ],
        "invalid_date_format": [
          "日付の形式を修正してください。"
        ],
        "invalid_img_scheme": [
          "画像のSRC属性にデータ形式のURIスキームが存在します。",
          "他のURIスキームを使用してください。"
        ],
        "invalid_kana_character": [
          "本文に半角カナ文字が含まれています。",
          "全角文字に置き換えるか削除してください。"
        ],
        "invalid_multibyte_character": [
          "本文に全角英数が含まれています。",
          "半角英数に置き換えるか削除してください。"
        ],
        "invalid_order_of_h": [
          "適切な順に配置してください。"
        ],
        "set_applet_alt": [
          "アプレットの内容を示す代替テキストを設定してください。"
        ],
        "set_area_alt": [
          "エリア要素の内容を示す代替テキストを設定してください。"
        ],
        "set_img_alt": [
          "画像の内容を示す代替テキストを設定してください。"
        ],
        "set_table_caption": [
          "表に見出し(CAPTION)が設定されていません",
          "TABLEタグの中にCAPTIONタグを追記してください。"
        ],
        "set_th_scope": [
          "表のヘッダー(TH)に見出しの方向であるSCOPE属性が設定されていません。",
          "行方向であればscope=\"colを設定してください。",
          "列方向であればscope=\"row\"を設定してください。"
        ]
      },
      "taken": "はすでに存在します。",
      "thums_is_not_an_image": "には画像ファイルを指定してください。",
      "too_bigfile": "携帯電話で表示する場合、%{filename}(%{filesize})のファイルサイズを%{mobile_size}以下になるようにしてください。",
      "too_bigsize": "携帯電話で表示する場合、ファイルサイズ合計(%{total})が制限値の%{mobile_size}以下になるようにしてください。",
      "too_large_file": "%{filename}(%{size}) のサイズが大きすぎます（制限値: %{limit}）。",
      "too_large_mail_size": "メールの添付ファイルサイズが大きすぎます。合計: %{size}（制限値: %{limit}）",
      "too_long": "は%{count}文字以内で入力してください。",
      "too_many_event_dates": "の設定日が多すぎます。%{count} 個以下になるように設定してください。",
      "too_short": "は%{count}文字以上で入力してください。",
      "try_again_later": "時間を置いてもう一度お試しください。",
      "user_email_blank": "以下のユーザーがメールアドレスを設定していないため、実行されませんでした。実行するには「メールアドレスが未設定でも実行する。」を選択してください。",
      "user_id_blank": "のユーザが設定されていません。",
      "wrong_length": "は%{count}文字で入力してください。"
    },
    "template": {
      "body": "次の項目を確認してください。",
      "check_links": "次のリンクを確認しました。",
      "header": {
        "one": "登録内容を確認してください。",
        "other": "登録内容を確認してください。"
      },
      "no_errors": "エラーは見つかりませんでした。",
      "no_links": "リンクは見つかりませんでした。"
    }
  },
  "event": {
    "add_date": "日付フォームを追加する",
    "add_repeat_dates": "一括設定",
    "apis": {
      "facilities": {
        "index": "施設を選択する"
      },
      "repeat_dates": {
        "add_dates": "追加する",
        "days": "該当日",
        "end": "終了日",
        "end_blank": "終了日を入力してください。",
        "not_found_dates": "該当する日付が見つかりませんでした。",
        "start": "開始日",
        "start_blank": "開始日を入力してください。",
        "wdays": "該当曜日"
      }
    },
    "category": {
      "setting": "カテゴリー"
    },
    "confirm": {
      "delete_date": "イベント日を削除してよろしいですか？"
    },
    "current_month": "今月",
    "date_range_delimiter": "～",
    "dates": {
      "close_date": "終了",
      "setting": "開催期間",
      "start_date": "開始"
    },
    "del_date": "削除",
    "facility": {
      "setting": "施設"
    },
    "filter_all": "全て",
    "keyword": "キーワード",
    "links": {
      "ical_refresh": "iCal配信取込"
    },
    "next_day": "次の日へ",
    "next_month": "次の月へ",
    "no_event": "イベントはありません",
    "options": {
      "event_display": {
        "list": "リスト形式",
        "list_only": "リスト形式のみ",
        "table": "表形式",
        "table_only": "表形式のみ"
      },
      "ical_refresh_method": {
        "auto": "自動",
        "manual": "手動"
      },
      "ical_sync_method": {
        "add_only": "追加",
        "full": "完全"
      },
      "sort": {
        "created": "作成日時",
        "event_dates": "イベント日",
        "event_dates_today": "イベント日(今日)",
        "event_dates_tomorrow": "イベント日(明日)",
        "event_dates_week": "イベント日(一週間以内)",
        "event_deadline": "イベント日(締切日間近)",
        "filename": "ファイル名",
        "name": "タイトル",
        "order": "指定順",
        "released_1": "公開日時",
        "unfinished_event_dates": "イベント日(未終了)",
        "updated_1": "更新日時"
      }
    },
    "page": "イベントページ",
    "prev_day": "前の日へ",
    "prev_month": "前の月へ",
    "search": {
      "no-result": "検索結果が見つかりませんでした。"
    },
    "submit": {
      "reset": "リセット",
      "search": "検索する"
    },
    "tooltips": {
      "file_import": [
        "CSV形式またはiCal形式のファイルをインポートすることができます。"
      ]
    }
  },
  "ezine": {
    "buttons": {
      "convert_html_to_text": "HTML版を変換する",
      "deliver": "本配信",
      "deliver_test": "テスト配信"
    },
    "column": "登録項目",
    "deliver": "本配信",
    "deliver_test": "テスト配信",
    "entry": "登録履歴",
    "entry_type": {
      "add": "配信登録",
      "delete": "配信停止",
      "update": "配信形式の変更"
    },
    "member": "メルマガ読者",
    "member_page_member": "購読会員",
    "messages": {
      "confirm_addr": "メールマガジンの%{type}を受け付けました。\n確認メールが届きますので、リンクをクリックしてください。",
      "verify_addr": "メールアドレスの確認を完了しました。"
    },
    "notice": {
      "delivered": "配信を開始しました",
      "delivered_test": "テスト配信を完了しました"
    },
    "options": {
      "delivery_state": {
        "disabled": "配信しない",
        "enabled": "配信する"
      },
      "email_type": {
        "html": "HTML版",
        "text": "テキスト版"
      }
    },
    "page": "メルマガ記事",
    "required_field": "必須項目",
    "sent_log": "配信ログ",
    "state": {
      "disabled": "配信しない",
      "enabled": "配信する"
    },
    "test_member": "テスト読者"
  },
  "facility": {
    "buttons": {
      "add_info": "項目を追加する",
      "del_info": "削除",
      "del_info_confirm": "項目を削除してよろしいですか？"
    },
    "category": {
      "index": "施設の種類を設定する",
      "name": "種類",
      "search": "施設の種類を検索",
      "setting": "施設の種類を選択"
    },
    "count": "件",
    "edit_page": "施設情報を編集する",
    "empty": "上記の条件では施設が見つかりませんでした。",
    "facility": "施設",
    "image": "施設写真",
    "import": {
      "confirm": "既に登録されている施設情報をすべて削除しインポートを行います。更新処理を開始してよろしいですか？",
      "invalid_file": "CSV形式のファイルを選択してください。",
      "log": "インポートログ",
      "start": "施設情報の更新処理を開始しました。"
    },
    "keyword": "キーワード",
    "location": {
      "index": "施設の地域を設定する",
      "name": "地域",
      "search": "施設の地域を検索",
      "setting": "施設の地域を選択"
    },
    "map": "地図",
    "node": "施設一覧",
    "page": "施設情報",
    "result": "検索結果",
    "search": "施設検索",
    "select_location": "地域を選択",
    "service": {
      "index": "施設の用途を設定する",
      "name": "用途",
      "search": "施設の用途を検索",
      "setting": "施設の用途を選択"
    },
    "sidebar": {
      "click_marker": "地図上で確認"
    },
    "submit": {
      "change": "検索条件を変更する",
      "reset": "検索条件をリセットする",
      "search": "この条件で検索する"
    },
    "tab": {
      "map": "地図表示",
      "result": "一覧表示"
    }
  },
  "faq": {
    "count": "件",
    "page": "FAQ記事",
    "query": {
      "category": "カテゴリー",
      "keyword": "キーワード"
    },
    "reset": "リセット",
    "result": "検索結果",
    "search": "検索"
  },
  "garbage": {
    "button": {
      "add_info": "項目を追加する",
      "del_info": "削除",
      "del_info_confirm": "項目を削除してよろしいですか？"
    },
    "category": {
      "index": "分別区分を設定する",
      "name": "分別区分",
      "search": "ゴミ品目の分別区分を検索",
      "setting": "分別区分を選択"
    },
    "count": "件の品目がヒットしました。",
    "edit_page": "編集する",
    "empty": "上記の条件ではゴミ品目が見つかりませんでした。",
    "first_to_last": "件の品目を表示しています。",
    "garbage": "ゴミDB",
    "item": "品目",
    "node": "ゴミ品目",
    "remark": "出し方・ワンポイント",
    "result": "検索結果",
    "search": "ゴミ品目検索",
    "submit": {
      "change": "検索条件を変更する",
      "reset": "検索条件をリセットする",
      "search": "この条件で検索する"
    }
  },
  "gws": {
    "apis": {
      "categories": {
        "index": "カテゴリーを選択する",
        "parent_id": "親カテゴリー"
      },
      "custom_groups": {
        "index": "カスタムグループを選択する"
      },
      "facilities": {
        "index": "設備を選択する"
      },
      "user_titles": {
        "index": "役職を選択する"
      }
    },
    "buttons": {
      "add_item": "新しい要素を追加",
      "unset": "解除"
    },
    "category": "カテゴリー",
    "columns": {
      "gws/check_box": "チェックボックス",
      "gws/date_field": "日付入力",
      "gws/file_upload": "ファイルアップロード",
      "gws/number_field": "数値入力",
      "gws/radio_button": "ラジオボタン",
      "gws/select": "ドロップダウン",
      "gws/text_area": "複数行入力",
      "gws/text_field": "一行入力",
      "gws/url_field": "URL入力"
    },
    "confirm": {
      "readable_setting": {
        "empty": "閲覧者が入力されていません。\\n全員に表示されますがよろしいですか？"
      }
    },
    "default_contrast": "既定のコントラスト",
    "errors": {
      "allowed_domains_only_root": "はルートグループにのみ設定できます。"
    },
    "group": "グループ",
    "history": {
      "days": {
        "next_day": "翌日",
        "prev_day": "前日",
        "today": "今日"
      },
      "mode": {
        "create": "登録",
        "delete": "削除",
        "login": "ログイン",
        "update": "変更"
      },
      "severity": {
        "error": "エラー",
        "info": "重要情報",
        "none": "出力しない",
        "notice": "一般情報",
        "warn": "警告"
      },
      "system_default_save_days": "システム既定",
      "system_default_severity": "システム既定",
      "user": {
        "create": "作成者",
        "delete": "削除者",
        "update": "更新者"
      }
    },
    "links": {
      "back_to_portal": "ポータルへ戻る",
      "webmail_user_import": "ウェブメール権限を含むインポート"
    },
    "member_log": {
      "copy_groups": "件のグループをコピーしました。",
      "copy_users": "件のユーザーをコピーしました。",
      "paste_groups": "件のグループを追加しました。",
      "paste_users": "件のユーザーを追加しました。"
    },
    "notice": {
      "contrast_changed": "コントラストを「%{name}」に変更しました。",
      "delay_download_with_message": "ファイル数が多い、またはファイル容量が大きいためバックグランドでファイルを準備します。\nダウンロードの準備ができましたらメッセージでお知らせします。",
      "webmail_user_import": "グループウェアの設定に加えて、ウェブメール権限を設定することができます。"
    },
    "notice_setting": {
      "functions": "通知対象"
    },
    "options": {
      "break": {
        "horizontal": "横並び",
        "vertically": "縦並び"
      },
      "input_type": {
        "check_box": "チェックボックス選択",
        "date_field": "日付",
        "email_field": "メールアドレス",
        "radio_button": "ラジオボタン選択",
        "select": "プルダウン選択",
        "text_area": "テキストエリア",
        "text_field": "テキストボックス",
        "upload_file": "ファイル投稿"
      },
      "notification": {
        "disabled": "通知しない",
        "enabled": "通知する"
      },
      "readable_setting_range": {
        "private": "非公開",
        "public": "全公開",
        "select": "選択範囲"
      },
      "severity": {
        "high": "重要なお知らせ"
      },
      "user_form_state": {
        "closed": "使用しない",
        "public": "使用する"
      }
    },
    "organization_addresses": "組織アドレス帳",
    "portal": "ポータル",
    "question_management": "質問管理",
    "roles": {
      "admin": "管理者",
      "user": "一般ユーザー"
    },
    "site_config": "設定",
    "site_info": "組織情報",
    "user_setting": "ポータル設定"
  },
  "gws/attendance": {
    "already_locked": "タイムカードは締められています。",
    "break": "休憩",
    "buttons": {
      "close": "閉じる",
      "lock": "締める",
      "punch": "打刻",
      "unlock": "締めを解除する"
    },
    "confirm": {
      "download": "タイムカードをダウンロードしてよろしですか？",
      "lock": "タイムカードを締めてよろしですか？",
      "punch": "打刻してよろしいですか？",
      "unlock": "タイムカードを締めを解除してよろしですか？"
    },
    "edit_cell": {
      "reason": "修正理由",
      "time": "時刻"
    },
    "enter_leave": "出退勤",
    "formats": {
      "break_enter": "休始%{count}",
      "break_leave": "休終%{count}",
      "time_card_full_name": "%{user_name}の%{month}のタイムカード",
      "time_card_name": "%{month}のタイムカード"
    },
    "hour": "%{count}時",
    "links": {
      "lock": "締める",
      "punch": "打刻する",
      "unlock": "締めを解除する"
    },
    "minute": "%{count}分",
    "next_month": "翌月",
    "no_target_users": "対象者がいません。",
    "no_time_cards": "タイムカードはありません。",
    "notice": {
      "punched": "打刻しました。"
    },
    "prev_month": "前月",
    "tooltips": {
      "encoding": [
        "文字コードを選択してください。",
        "難読人名に対して特殊な漢字を割り当てている場合は「UTF-8」を選択してください。",
        "通常の利用の場合ですと「シフトJIS」を選択して問題ありません。"
      ]
    }
  },
  "gws/board": {
    "comment": {
      "comment": "コメントする",
      "confirm": "削除しますか？",
      "created": "投稿日",
      "delete": "削除",
      "edit": "編集",
      "notice": {
        "create": "コメントを投稿しました。",
        "delete": "コメントを削除しました。",
        "update": "コメントを更新しました。"
      },
      "submit": "投稿",
      "update": "更新",
      "updated": "最終更新日"
    },
    "errors": {
      "denied_comment": "コメントの投稿は許可されていません。"
    },
    "links": {
      "back_to_thread": "戻る",
      "categories": "カテゴリー",
      "comment": "返信する"
    },
    "no_authority": "権限がありません",
    "options": {
      "browsed_state": {
        "both": "両方",
        "read": "既読",
        "unread": "未読"
      },
      "mode": {
        "thread": "スレッド",
        "tree": "ツリー"
      },
      "permit_comment": {
        "allow": "許可する",
        "deny": "許可しない"
      },
      "severity": {
        "important": "重要",
        "normal": "通常"
      },
      "subscribed_users_readable_state": {
        "admin": "管理権限のみ",
        "subscriber": "購読者全員"
      }
    },
    "topic": {
      "browsed": "閲覧",
      "browsed_state": "状態",
      "browsed_user_info": {
        "format": "%{count} 人 / %{total} 人中",
        "more": "詳しく見る",
        "title": "既読者数"
      },
      "browsing_state": "通知先",
      "comment": "コメント",
      "confirm": "削除しますか？",
      "delete": "削除",
      "edit": "編集",
      "list": "トピック一覧へ",
      "new": "新規作成",
      "notice": {
        "create": "トピックを作成しました。",
        "delete": "トピックを削除しました。",
        "update": "トピックを更新しました。"
      },
      "submit": "投稿",
      "update": "更新"
    },
    "user": "ユーザー"
  },
  "gws/bookmark": {
    "notice": {
      "save": "お気に入りを保存しました"
    },
    "options": {
      "bookmark_model": {
        "other": "その他"
      }
    }
  },
  "gws/chorg": {
    "options": {
      "staff_record_state": {
        "create": "作成する"
      }
    }
  },
  "gws/circular": {
    "confirm": {
      "download": "選択した項目を全てCSVに出力しますか？",
      "set_seen_all": "選択した項目を全て既読にしますか？",
      "unset_seen_all": "選択した項目を全て未読に戻しますか？"
    },
    "csv": [
      "回覧id",
      "タイトル",
      "返信id",
      "状態",
      "返信者名",
      "返信欄",
      "返信日時"
    ],
    "links": {
      "back_to_admin": "作成した回覧へ戻る"
    },
    "options": {
      "article_state": {
        "both": "全表示",
        "unseen": "未読"
      },
      "circular_delete_threshold": [
        "6ヶ月",
        "1年",
        "1年6ヶ月",
        "2年",
        "2年6ヶ月",
        "3年",
        "3年6ヶ月"
      ],
      "see_type": {
        "normal": "通常回覧",
        "simple": "簡易回覧"
      },
      "sort": {
        "created_asc": "投稿日(日付順)",
        "created_desc": "投稿日(新着順)",
        "due_date_asc": "回覧期限日時(昇順)",
        "due_date_desc": "回覧期限日時(降順)",
        "updated_asc": "最終更新日(日付順)",
        "updated_desc": "最終更新日(新着順)"
      }
    },
    "post": {
      "disabled": "削除済み",
      "download": "CSVに出力する",
      "member": "参加者",
      "replay": "返信内容",
      "seen": "既読",
      "seen_at": "既読日時",
      "set_seen": "既読にする",
      "type": "区分",
      "unseen": "未読",
      "unset_seen": "未読にする",
      "update_at": "変更日時",
      "user": "ユーザー"
    },
    "seen_user_info": {
      "format": "%{count} 人 / %{total} 人中",
      "more": "詳しく見る",
      "title": "既読者数"
    },
    "setting": "回覧板設定",
    "tabs": {
      "admin": "作成した回覧",
      "post": "受信した回覧",
      "trash": "ゴミ箱"
    }
  },
  "gws/column": {
    "options": {
      "column_input_type": {
        "email": "メールアドレス",
        "tel": "電話番号",
        "text": "テキスト"
      },
      "date_input_type": {
        "date": "日付のみ",
        "datetime": "日付＋時間"
      },
      "minus_type": {
        "filled_triangle": "▲",
        "normal": "-",
        "triangle": "△"
      }
    }
  },
  "gws/discussion": {
    "admin": "管理",
    "links": {
      "forum": {
        "back_to_index": "会議室一覧へ戻る",
        "edit": "会議室の編集"
      },
      "member": {
        "index": "参加者一覧"
      },
      "todo": {
        "index": "ToDo一覧を見る"
      },
      "topic": {
        "copy": "スレッドを複製する",
        "delete": "スレッドを削除する",
        "edit": "スレッドを編集する",
        "index": "スレッド一覧を見る",
        "new": "スレッドを新規作成",
        "reply": "コメントを投稿する",
        "show": "全ての投稿を見る"
      }
    },
    "main_topic": {
      "name": "メインスレッド",
      "text": "%{name}のメインスレッドです。"
    },
    "members": "参加者",
    "navi": {
      "forum": {
        "readable": "会議室一覧"
      },
      "todo": {
        "readable": "ToDo一覧"
      },
      "topic": {
        "portal": "会議室ポータル",
        "readable": "スレッド一覧"
      }
    },
    "notice": {
      "comment_limit": "コメント数が%{limit}件を超えました。新規スレッドを作成してください。",
      "forum_copy": "※複製後は非公開状態になります。ToDo は複製されません。",
      "no_recents": "新着はありません。",
      "no_todos": "登録されていません",
      "no_topics": "スレッドはありません。",
      "reload": "※新着投稿があります。クリックすることで再描画します。"
    },
    "notify_message": {
      "post": {
        "subject": "[電子会議室] %{forum_name}(%{topic_name}) に新しい投稿がありました。",
        "text": "%{text}"
      },
      "topic": {
        "subject": "[電子会議室] %{forum_name} に「%{topic_name}」スレッドが作成されました。",
        "text": "%{text}"
      }
    },
    "options": {
      "discussion_unseen_interval": {
        "10sec": "１０秒",
        "1min": "１分",
        "30sec": "３０秒",
        "5min": "５分",
        "none": "確認しない"
      },
      "permit_comment": {
        "allow": "許可する",
        "deny": "許可しない"
      }
    },
    "topics": "スレッド"
  },
  "gws/elasticsearch": {
    "format": {
      "search_results_count": {
        "one": "%{count} 件中 %{from} 件目から %{to} 件目の検索結果 (%{took} 秒)",
        "other": "%{count} 件中 %{from} 件目から %{to} 件目の検索結果 (%{took} 秒)",
        "zero": "検索式にマッチする文書はありませんでした。"
      }
    },
    "tabs": {
      "all": "すべて"
    }
  },
  "gws/facility": {
    "category": "カテゴリー",
    "errors": {
      "require_approver": "予約承認には管理ユーザーの登録が必要です。"
    },
    "manage_columns": "追加入力を管理する",
    "navi": {
      "category": "設備カテゴリー",
      "item": "設備設定",
      "state": "設備利用状況",
      "usage": "設備利用率"
    },
    "prompts": {
      "days": "日先まで",
      "minutes": "分"
    },
    "state": {
      "end_at": "予約終了日時",
      "facility": "設備名",
      "purpose": "利用目的",
      "section": "利用課",
      "start_at": "予約開始日時",
      "user": "予約者"
    },
    "usage": {
      "hours": "時間",
      "times": "回数",
      "type": "種類",
      "usage_day": "利用日",
      "usage_month": "利用月"
    }
  },
  "gws/facility/item": {
    "csv": {
      "activation_date": "有効期限（開始）",
      "approval_check_state": "予約承認",
      "approval_check_state_datas": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "category_id": "カテゴリー",
      "columns": {
        "additional_attr": "追加入力%{n}追加属性",
        "id": "追加入力%{n}ID",
        "initial_decimal": "追加入力%{n}初期値",
        "input_type": "追加入力%{n}種類",
        "input_type_datas": {
          "date": "日付のみ",
          "datetime": "日付＋時間",
          "email": "メールアドレス",
          "tel": "電話番号",
          "text": "テキスト"
        },
        "max_decimal": "追加入力%{n}最大値",
        "max_length": "追加入力%{n}最大長",
        "min_decimal": "追加入力%{n}最小値",
        "minus_type": "追加入力%{n}負数の表示方法",
        "minus_type_datas": {
          "filled_triangle": "▲",
          "normal": "-",
          "triangle": "△"
        },
        "name": "追加入力%{n}名前",
        "order": "追加入力%{n}並び順",
        "place_holder": "追加入力%{n}プレースホルダー",
        "postfix_label": "追加入力%{n}後ラベル",
        "prefix_label": "追加入力%{n}前ラベル",
        "required": "追加入力%{n}必須入力",
        "required_datas": {
          "optional": "任意",
          "required": "必須"
        },
        "scale": "追加入力%{n}小数点以下の桁数",
        "select_options": "追加入力%{n}選択肢",
        "tooltips": "追加入力%{n}ツールチップ",
        "type": "追加入力%{n}入力項目",
        "upload_file_count": "追加入力%{n}ファイルアップロード数"
      },
      "expiration_date": "有効期限（終了）",
      "group_names": "管理グループ",
      "html": "内容本文",
      "id": "ID",
      "max_days_limit": "予約可能期間",
      "max_minutes_limit": "時間制限（最大）",
      "min_minutes_limit": "時間制限（最小）",
      "minutes_limit": "時間制限",
      "name": "設備名",
      "order": "並び順",
      "permission_level": "権限レベル",
      "readable_group_names": "閲覧グループ",
      "readable_member_names": "閲覧ユーザー",
      "readable_setting_range": "公開範囲",
      "readable_setting_range_datas": {
        "private": "非公開",
        "public": "全公開",
        "select": "選択範囲"
      },
      "reservable_group_names": "予約可能グループ",
      "reservable_member_names": "予約可能ユーザー",
      "reservation_end_date": "予約可能期間（終了）",
      "reservation_start_date": "予約可能期間（開始）",
      "type": "内容形式",
      "type_datas": {
        "markdown": "Markdown形式",
        "plain": "テキスト形式"
      },
      "user_names": "管理ユーザー"
    }
  },
  "gws/faq": {
    "comment": {
      "comment": "コメントする",
      "confirm": "削除しますか？",
      "created": "投稿日",
      "delete": "削除",
      "edit": "編集",
      "notice": {
        "create": "コメントを投稿しました。",
        "delete": "コメントを削除しました。",
        "update": "コメントを更新しました。"
      },
      "submit": "投稿",
      "update": "更新",
      "updated": "最終更新日"
    },
    "errors": {
      "denied_comment": "コメントの投稿は許可されていません。"
    },
    "links": {
      "back_to_thread": "戻る",
      "categories": "カテゴリー",
      "comment": "返信する"
    },
    "no_authority": "権限がありません",
    "options": {
      "browsed_state": {
        "read": "既読",
        "unread": "未読"
      },
      "mode": {
        "thread": "スレッド",
        "tree": "ツリー"
      },
      "permit_comment": {
        "allow": "許可する",
        "deny": "許可しない"
      },
      "severity": {
        "important": "重要",
        "normal": "通常"
      }
    },
    "topic": {
      "browsed": "閲覧",
      "browsing_state": "通知先",
      "comment": "コメント",
      "confirm": "削除しますか？",
      "delete": "削除",
      "edit": "編集",
      "list": "トピック一覧へ",
      "new": "新規作成",
      "notice": {
        "create": "トピックを作成しました。",
        "delete": "トピックを削除しました。",
        "update": "トピックを更新しました。"
      },
      "submit": "投稿",
      "update": "更新"
    },
    "user": "ユーザー"
  },
  "gws/job": {
    "reservation": "実行予約"
  },
  "gws/memo": {
    "buttons": {
      "seen": "送信者一覧"
    },
    "confirm": {
      "publish": "送信してよろしいですか？"
    },
    "links": {
      "publish": "送信する",
      "show_messages": "メッセージを見る"
    },
    "no_senders": "No name",
    "no_subjects": "No title",
    "notice": {
      "capacity_over_members": "次の受信者のメッセージ容量が制限を超過しています。次の受信者にはメッセージが届きません。"
    },
    "options": {
      "export_filter": {
        "all": "全てのメッセージ",
        "selected": "選択したメッセージ"
      },
      "priority": {
        "1": "最高",
        "2": "高",
        "3": "標準",
        "4": "低",
        "5": "最低"
      },
      "state": {
        "closed": "下書き",
        "public": "送信済み"
      }
    },
    "setting": "メッセージ設定",
    "unseen": "未読"
  },
  "gws/memo/filter": {
    "errors": {
      "blank_apply_mailbox": "適用するフォルダーを選択してください。",
      "blank_conditions": "条件を入力してください。"
    },
    "options": {
      "action": {
        "move": "移動する",
        "trash": "ゴミ箱に移す"
      }
    }
  },
  "gws/memo/folder": {
    "inbox": "受信トレイ",
    "inbox_draft": "下書き",
    "inbox_sent": "送信済みトレイ",
    "inbox_trash": "ゴミ箱"
  },
  "gws/memo/forward": {
    "subject": "送信者"
  },
  "gws/memo/group_setting": {
    "options": {
      "reminder": [
        "表示しない",
        "送信された当日のみ表示する",
        "送信後２日間のみ表示する",
        "送信後３日間のみ表示する",
        "送信後４日間のみ表示する",
        "送信後５日間のみ表示する"
      ]
    }
  },
  "gws/memo/message": {
    "child_folder": "子フォルダー",
    "commit_params_check": "送信",
    "confirm": {
      "move": "移動しますか?",
      "move_drop": {
        "head": "選択したメッセージを",
        "tail": "に移動しますか？",
        "to": "から"
      },
      "send": "送信してよろしいですか？",
      "set_seen_all": "既読にしますか？",
      "set_star_all": "スターをつけますか？",
      "trash_all": "ゴミ箱に移しますか？",
      "unset_seen_all": "未読にしますか？",
      "unset_star_all": "スターを外しますか？"
    },
    "errors": {
      "blank_message": "メッセージを選択してください。"
    },
    "export": {
      "notify_message": "ダウンロードの準備が完了しました。\n下記のURLからダウンロードしてください。\n\n%{link}",
      "start_message": "エクスポート処理を開始しました。\nエクスポート処理が完了次第、ダウンロードリンクが通知されます。",
      "subject": "[メッセージ] エクスポートが完了しました。"
    },
    "export_failed": {
      "empty_messages": "エクスポート対象のメッセージが見つかりませんでした。",
      "notify_message": "エクスポートが失敗しました。失敗の原因はタスク・マネージャーから確認することができます。",
      "subject": "[メッセージ] エクスポートが失敗しました。"
    },
    "export_filter": "対象",
    "export_messages": "エクスポート",
    "folder": "フォルダー",
    "folder_name": "フォルダー名",
    "format": "フォーマット",
    "import": {
      "caution": "※差出人や送信者等のユーザー情報は、エクスポートしたデータとID及び氏名が一致している場合のみ復元されます。"
    },
    "import_messages": "インポート",
    "links": {
      "deleted": "削除済み",
      "etc": "その他",
      "forward": "転送する",
      "move": "移動する",
      "print": "印刷",
      "ref": "新規メッセージとして編集する",
      "reply": "返信する",
      "reply_all": "全員に返信",
      "seens": "既読含む",
      "set_seen": "既読にする",
      "set_star": "スターをつける",
      "sort": "並び替え",
      "trash": "ゴミ箱に移す",
      "unseens": "未読のみ",
      "unset_seen": "未読にする",
      "unset_star": "スターをはずす"
    },
    "mdn": {
      "confirmed": "メッセージが開封されました。\n%{name} %{date}",
      "subject": "[開封確認] %{subject}"
    },
    "message": "メッセージ",
    "notice": {
      "ignore_mdn": "開封確認を無視しました。",
      "no_recents": "新着はありません",
      "send_mdn": "開封確認メッセージを送信しました。",
      "start_export": "エクスポートを開始しました。",
      "start_import": "インポートしました。"
    },
    "select_check": "件のメッセージを選択",
    "unsend": "送信先のメッセージも削除する（送信取り消し）"
  },
  "gws/memo/notice_user_settings": {
    "options": {
      "email": {
        "notify": "転送する",
        "silence": "転送しない"
      }
    },
    "send_mail_address": "転送先メールアドレス",
    "send_mail_setting": "メール転送"
  },
  "gws/monitor": {
    "buttons": {
      "publish": "配信"
    },
    "comment": {
      "comment": "コメントする",
      "confirm": "削除しますか？",
      "created": "作成日時",
      "delete": "削除",
      "edit": "編集",
      "notice": {
        "create": "コメントを投稿しました。",
        "delete": "コメントを削除しました。",
        "update": "コメントを更新しました。"
      },
      "submit": "投稿",
      "update": "更新",
      "updated": "更新日時"
    },
    "confirm": {
      "answer": "回答済みにしますか？",
      "close": "回答を締め切りますか？",
      "comment_answer": "所属として回答します。よろしいですか？",
      "open": "締め切りを解除してよろしいですか？",
      "preparation": "受取待ちに戻しますか？",
      "preparation_all": "チェックした項目を受取待ちにしますか？",
      "public": "受取済みにしますか？",
      "public_all": "チェックした項目を受取済みにしますか？",
      "publish": "配信してよろしいですか？",
      "question_not_applicable": "該当なしにしますか？",
      "question_not_applicable_all": "チェックした項目を該当なしにしますか？"
    },
    "csv": [
      "照会・回答id",
      "タイトル",
      "状態",
      "所属名",
      "回答者名",
      "回答欄",
      "回答日時"
    ],
    "due_date_over": "回答期限超過",
    "errors": {
      "denied_comment": "コメントの投稿は許可されていません。"
    },
    "links": {
      "answered": "回答済みにする",
      "back_to_thread": "戻る",
      "categories": "カテゴリー",
      "closed": "締め切る",
      "comment": "回答する",
      "export_csv": "回答一覧CSV",
      "file_download": "添付ファイル一括ダウンロード",
      "forward": "転送する",
      "open": "締め切り解除",
      "preparation": "受取待ちに戻す",
      "public": "受取済みにする",
      "publish": "配信する",
      "question_not_applicable": "該当なしにする",
      "reply": "返信する"
    },
    "management": {
      "links": {
        "back_to_topic": "戻る"
      }
    },
    "no_authority": "権限がありません",
    "notice": {
      "close": "回答を締め切りました",
      "open": "締め切りを解除しました",
      "preparation": "受取待ちに戻しました",
      "public": "受取済みにしました",
      "published": "公開しました",
      "question_not_applicable": "該当なしにしました"
    },
    "options": {
      "answer_state": {
        "answered": "回答済み",
        "no_state": "状態無し",
        "preparation": "受取待ち",
        "public": "受取済み",
        "question_not_applicable": "該当なし"
      },
      "article_state": {
        "closed": "募集締切",
        "open": "回答募集中"
      },
      "browsed_state": {
        "read": "既読",
        "unread": "未読"
      },
      "mode": {
        "thread": "スレッド",
        "tree": "ツリー"
      },
      "monitor_delete_threshold": {
        "1.day": "1日",
        "1.month": "1ヶ月",
        "12.months": "12ヶ月",
        "15.months": "15ヶ月",
        "18.months": "18ヶ月",
        "24.months": "24ヶ月",
        "3.months": "3ヶ月",
        "6.months": "6ヶ月",
        "9.months": "9ヶ月"
      },
      "notice_state": {
        "1_day_before_due_date": "回答期限日の1日前から表示",
        "1_day_from_released": "配信日から1日後に表示",
        "2_days_before_due_date": "回答期限日の2日前から表示",
        "2_days_from_released": "配信日から2日後に表示",
        "3_days_before_due_date": "回答期限日の3日前から表示",
        "3_days_from_released": "配信日から3日後に表示",
        "4_days_before_due_date": "回答期限日の4日前から表示",
        "4_days_from_released": "配信日から4日後に表示",
        "5_days_before_due_date": "回答期限日の5日前から表示",
        "5_days_from_released": "配信日から5日後に表示",
        "from_now": "配信直後から表示する",
        "none": "表示しない"
      },
      "permit_comment": {
        "allow": "許可する",
        "deny": "許可しない"
      },
      "severity": {
        "important": "重要",
        "normal": "通常"
      },
      "sort": {
        "created_asc": "作成日時(日付順)",
        "created_desc": "作成日時(新着順)",
        "due_date_asc": "回答期限(日付順)",
        "due_date_desc": "回答期限(新着順)",
        "released_asc": "公開日時(日付順)",
        "released_desc": "公開日時(新着順)",
        "updated_asc": "更新日時(日付順)",
        "updated_desc": "更新日時(新着順)"
      },
      "spec_config": {
        "my_group": "回答者のみ表示する",
        "other_groups": "他の回答者名を表示する",
        "other_groups_and_contents": "他の回答者名と内容を表示する"
      },
      "state": {
        "closed": "締め切り",
        "draft": "下書き",
        "public": "配信済み"
      }
    },
    "portal_notice_format": "未回答の照会が %{count}件 あります。グループ内で担当者を決定のうえ、回答してください。",
    "tabs": {
      "admin": "作成した設問",
      "answer": "回答済み",
      "article_management": "設問（管理）",
      "management_admin": "設問（管理）",
      "unanswer": "未回答"
    },
    "topic": {
      "answer_state": "回答状況",
      "browsed": "閲覧",
      "browsing_state": "参加グループ",
      "comment": "コメント",
      "confirm": "削除しますか？",
      "contents": "回答内容",
      "delete": "削除",
      "disabled_items": "削除済み",
      "edit": "編集",
      "export_csv": "CSV出力",
      "file": "添付",
      "file_download": "ファイルの一括ダウンロード",
      "group": "グループ",
      "list": "トピック一覧へ",
      "mark_at": "確認日時",
      "new": "新規作成",
      "notice": {
        "create": "トピックを作成しました。",
        "delete": "トピックを削除しました。",
        "update": "トピックを更新しました。"
      },
      "submit": "投稿",
      "type": "状態",
      "update": "更新",
      "update_at": "変更日時",
      "user": "回答者"
    },
    "user": "ユーザー"
  },
  "gws/notice": {
    "all": "すべてのお知らせ",
    "body_size": "本文",
    "confirm": {
      "create_my_folder": "自所属を作成してよろしいですか？",
      "set_seen": "既読にしてもよろしいですか？",
      "unset_seen": "未読にしてもよろしいですか？"
    },
    "file_size": "添付ファイル",
    "gws_addon_member_head": "投稿者",
    "individual_body_size": "個別容量制限",
    "individual_file_size": "個別容量制限",
    "links": {
      "create_my_folder": "自所属を作成する",
      "move_to_my_folder": "自所属フォルダーを開く",
      "reclaim_total_size": "使用量を再計算する",
      "set_seen": "既読にする",
      "unset_seen": "未読にする"
    },
    "notice": {
      "not_a_member_in_this_folder": "このフォルダーへお知らせを掲示する権限がありません。"
    },
    "total_body_size": "総容量制限",
    "total_body_size_current_stats": "現在%{size}使用中です。使用率は%{percentage}です。",
    "total_file_size": "総容量制限",
    "total_file_size_current_stats": "現在%{size}使用中です。使用率は%{percentage}です。"
  },
  "gws/personal_address": {
    "navi": {
      "group": "グループ設定"
    }
  },
  "gws/portal": {
    "buttons": {
      "save_layouts": "配置を保存する"
    },
    "create_portlets_for_reset": "作成されるポートレット",
    "delete_portlets_for_reset": "削除されるポートレット",
    "group_portal": "部課ポータル",
    "links": {
      "arrange_portlets": "ポートレットの配置",
      "edit_portlet": "ポートレットを編集する",
      "manage_portlets": "ポートレットの管理",
      "settings": "ポータルの設定"
    },
    "messages": {
      "closed_portlet": "このポートレットは閲覧できません。",
      "no_portlets": "ポートレットを作成してください。"
    },
    "options": {
      "reminder_filter": {
        "all": "すべて表示",
        "future": "未来日のみ"
      }
    },
    "other_config": "他者・他部課設定",
    "portlets": {
      "ad": {
        "name": "広告",
        "text": "広告を表示します。"
      },
      "attendance": {
        "name": "出退勤",
        "text": "本日の出退勤を表示および打刻します。"
      },
      "board": {
        "name": "掲示板",
        "text": "新着の投稿を表示します。"
      },
      "bookmark": {
        "name": "お気に入り",
        "text": "お気に入りを表示します。"
      },
      "circular": {
        "name": "回覧板",
        "text": "新着の回覧を表示します。"
      },
      "faq": {
        "name": "よくある質問",
        "text": "新着の投稿を表示します。"
      },
      "free": {
        "name": "自由形式",
        "text": "表示内容を自由に記述します。"
      },
      "header": {
        "name": "ポートレット種別",
        "text": "説明"
      },
      "links": {
        "name": "リンク集",
        "text": "リンク集を作成します。"
      },
      "monitor": {
        "name": "照会・回答",
        "text": "新着の照会・回答を表示します。"
      },
      "notice": {
        "name": "お知らせ",
        "text": "新着のお知らせを表示します。"
      },
      "presence": {
        "name": "在席管理",
        "text": "グループに所属するユーザーの在席状況を表示します。"
      },
      "qna": {
        "name": "Ｑ＆Ａ",
        "text": "新着の投稿を表示します。"
      },
      "reminder": {
        "name": "リマインダー",
        "text": "リマインダーを表示します。"
      },
      "report": {
        "name": "レポート",
        "text": "新着のレポートを表示します。"
      },
      "schedule": {
        "name": "スケジュール",
        "text": "今週のスケジュールを表示します。"
      },
      "share": {
        "name": "共有ファイル",
        "text": "新着の共有ファイルを表示します。"
      },
      "survey": {
        "name": "アンケート",
        "text": "新着または期限間近のアンケートを表示します。"
      },
      "todo": {
        "name": "ToDo",
        "text": "担当ToDoを表示します。"
      },
      "workflow": {
        "name": "ワークフロー",
        "text": "新着のワークフローを表示します。"
      }
    },
    "root_portal": "全庁ポータル",
    "self_portal": "個人",
    "tabs": {
      "root_portal": "全庁",
      "user_portal": "個人"
    },
    "user_portal": "個人ポータル"
  },
  "gws/presence": {
    "buttons": {
      "register_reminder": "リマインダーを登録"
    },
    "group": "グループ",
    "links": {
      "all_groups": "全てのユーザー"
    },
    "sync_state": "ステータス自動更新"
  },
  "gws/qna": {
    "comment": {
      "comment": "コメントする",
      "confirm": "削除しますか？",
      "created": "投稿日",
      "delete": "削除",
      "edit": "編集",
      "notice": {
        "create": "コメントを投稿しました。",
        "delete": "コメントを削除しました。",
        "update": "コメントを更新しました。"
      },
      "submit": "投稿",
      "update": "更新",
      "updated": "最終更新日"
    },
    "confirm": {
      "resolve": "解決済みにしてよろしいですか？",
      "unresolve": "未解決に戻してよろしいですか？"
    },
    "errors": {
      "denied_comment": "コメントの投稿は許可されていません。"
    },
    "links": {
      "back_to_thread": "戻る",
      "categories": "カテゴリー",
      "comment": "返信する",
      "resolve": "解決済みにする",
      "unresolve": "未解決に戻す"
    },
    "no_authority": "権限がありません",
    "options": {
      "browsed_state": {
        "read": "既読",
        "unread": "未読"
      },
      "mode": {
        "thread": "スレッド",
        "tree": "ツリー"
      },
      "permit_comment": {
        "allow": "許可する",
        "deny": "許可しない"
      },
      "question_state": {
        "open": "回答待ち",
        "resolved": "解決済み"
      },
      "severity": {
        "important": "重要",
        "normal": "通常"
      }
    },
    "topic": {
      "browsed": "閲覧",
      "browsing_state": "通知先",
      "comment": "コメント",
      "confirm": "削除しますか？",
      "delete": "削除",
      "edit": "編集",
      "list": "トピック一覧へ",
      "new": "新規作成",
      "notice": {
        "create": "トピックを作成しました。",
        "delete": "トピックを削除しました。",
        "update": "トピックを更新しました。"
      },
      "submit": "投稿",
      "update": "更新"
    },
    "user": "ユーザー"
  },
  "gws/reminder": {
    "buttons": {
      "register_reminder": "リマインダーを登録"
    },
    "links": {
      "restore_reminder": "元に戻す"
    },
    "notfound": {
      "same_name_items": "同じ件名の予定",
      "same_repeat_items": "同じ繰り返し予定",
      "summary": "予定は存在しません。変更されたか削除されています。"
    },
    "notification": {
      "created": "登録しました。",
      "subject": "[リマインダー] %{model} - %{name}",
      "updated": "更新しました。"
    },
    "options": {
      "base_time": {
        "10:00": "午前 10:00",
        "10:30": "午前 10:30",
        "11:00": "午前 11:00",
        "11:30": "午前 11:30",
        "12:00": "午前 12:00",
        "12:30": "午前 12:30",
        "13:00": "午後 1:00",
        "13:30": "午後 1:30",
        "14:00": "午後 2:00",
        "14:30": "午後 2:30",
        "15:00": "午後 3:00",
        "15:30": "午後 3:30",
        "16:00": "午後 4:00",
        "16:30": "午後 4:30",
        "17:00": "午後 5:00",
        "17:30": "午後 5:30",
        "18:00": "午後 6:00",
        "18:30": "午後 6:30",
        "19:00": "午後 7:00",
        "19:30": "午後 7:30",
        "20:00": "午後 8:00",
        "8:00": "午前 8:00",
        "8:30": "午前 8:30",
        "9:00": "午前 9:00",
        "9:30": "午前 9:30"
      },
      "interval_type": {
        "days": "日前",
        "hours": "時間前",
        "minutes": "分前",
        "weeks": "週前"
      },
      "interval_type_allday": {
        "days": "日前",
        "weeks": "週前"
      },
      "notify_state": {
        "disabled": "通知しない",
        "enabled": "通知する",
        "mail": "メール通知"
      }
    }
  },
  "gws/report": {
    "apis": {
      "files": {
        "index": "レポートを選択する"
      }
    },
    "confirm": {
      "depublish": "送信を取り消してよろしいですか？",
      "publish": "送信してよろしいですか？"
    },
    "labels": {
      "form": "帳票",
      "user": "作成者"
    },
    "links": {
      "depublish": "送信を取り消す",
      "publish": "送信する"
    },
    "notice": {
      "depublished": "送信を取り消しました。",
      "published": "送信しました。"
    },
    "options": {
      "file_state": {
        "closed": "下書き",
        "inbox": "受信一覧",
        "public": "送信済み",
        "readable": "閲覧一覧",
        "redirect": "リダイレクト",
        "sent": "送信一覧"
      }
    }
  },
  "gws/schedule": {
    "buttons": {
      "comment": "コメント",
      "delete_all": "一連のスケジュールすべて",
      "delete_later": "以降すべて",
      "delete_one": "今回のみ"
    },
    "calendar": {
      "buttonText": {
        "listMonth": "リスト",
        "withAbsence": "欠席表示",
        "withTodo": "ToDo表示"
      },
      "titleFormat": {
        "day": "YYYY年 M月 D日（ddd）",
        "month": "YYYY年 M月",
        "week": "(YYYY年 M月 D日（ddd）)"
      }
    },
    "csv": {
      "color": "表示色",
      "end_on": "終了日",
      "id": "ID",
      "name": "タイトル",
      "repeat_plan_datas": {
        "id": "繰り返しID",
        "interval": "繰り返し間隔",
        "repeat_base": "繰り返し基準",
        "repeat_end": "繰り返し終了日",
        "repeat_start": "繰り返し開始日",
        "repeat_type": "繰り返し",
        "wdays": "曜日"
      },
      "start_on": "開始日"
    },
    "errors": {
      "double_booking_facility": "設備は既に予約されています。",
      "empty_plan_days": "予定を登録できる日が存在しません。",
      "faciliy_day_lte": "予約時間は%{count}日以内の値にしてください。",
      "faciliy_time_gte": "予約時間は%{count}分以上の値にしてください。",
      "faciliy_time_lte": "予約時間は%{count}分以下の値にしてください。",
      "invalid_faciliy_reservate_member": "%{name}を予約する権限がありません。",
      "less_than_max_date": "は%{date}までの日時を入力してください。",
      "less_than_years": "は%{count}年間以内の範囲にしてください。",
      "not_found_reservable_facilities": "予約可能な設備が見つかりません。",
      "over_than_facility_hours": "設備予約は取得可能時間内で登録してください。（%{min}時～%{max}時）",
      "unable_to_reserve_all_days": "設備の利用時間が制限されているため終日予約することができません。"
    },
    "facility_reservation": {
      "exist": "予約不可",
      "free": "予約可能",
      "index": "予約状況の確認"
    },
    "import": {
      "count": "%{count} 件の予定をインポートしました。",
      "entry": "登録可能",
      "error": "エラー",
      "exist": "登録済み",
      "result": "結果",
      "saved": "登録完了"
    },
    "links": {
      "add_holiday": "休日を作成",
      "add_plan": "予定を作成",
      "add_todo": "ToDoを作成",
      "back_to_calendar": "カレンダーへ戻る",
      "back_to_todo": "ToDoへ戻る",
      "create_report": "レポートを作成する",
      "download": "ダウンロード",
      "import": "インポート",
      "show_day": "日表示",
      "show_month": "月表示",
      "show_week": "週表示"
    },
    "loading": "読み込み中",
    "navi": {
      "category": "種別設定",
      "holiday": "休日設定",
      "todo": "ToDo一覧",
      "trash": "ゴミ箱"
    },
    "no_plan": "予定はありません",
    "operations": {
      "collapse_all": "すべて閉じる",
      "expand_all": "すべて展開"
    },
    "options": {
      "allday": {
        "allday": "終日"
      },
      "approval_state": {
        "approve": "承認",
        "deny": "拒否",
        "unknown": "未確認"
      },
      "approved_state": {
        "approve": "承認済み",
        "deny": "差し戻し",
        "request": "承認待ち"
      },
      "attendance_state": {
        "absence": "不参加",
        "attendance": "参加",
        "unknown": "未確認"
      },
      "interval": {
        "daily": "日",
        "monthly": "月",
        "weekly": "週",
        "yearly": "年"
      },
      "priority": {
        "1": "最高",
        "2": "高",
        "3": "標準",
        "4": "低",
        "5": "最低"
      },
      "repeat_base": {
        "date": "日付",
        "wday": "曜日"
      },
      "repeat_type": {
        "daily": "毎日",
        "monthly": "毎月",
        "none": "繰り返しなし",
        "weekly": "毎週",
        "yearly": "毎年"
      },
      "schedule_attachment_state": {
        "allow": "許可する",
        "deny": "許可しない"
      },
      "schedule_drag_drop_state": {
        "allow": "許可する",
        "deny": "許可しない"
      }
    },
    "private_plan": "予定あり",
    "reminder": "リマインダー",
    "search_plans": "予定を検索",
    "search_times": "空き時間を検索",
    "search_users": "ユーザーを検索",
    "tabs": {
      "facility": "設備予約",
      "group": "全体",
      "manageable_todo": "他ユーザーのToDo",
      "my_todo": "担当ToDo",
      "personal": "個人",
      "personal_list": "予定リスト",
      "search": "検索",
      "search/times": "空き時間検索",
      "search/users": "ユーザー検索"
    }
  },
  "gws/schedule/group_setting": {
    "options": {
      "todo_delete_threshold": [
        "6ヶ月",
        "1年",
        "1年6ヶ月",
        "2年",
        "2年6ヶ月",
        "3年",
        "3年6ヶ月"
      ]
    }
  },
  "gws/schedule/todo": {
    "achievement_rate": "%{count}%",
    "achievement_rate_unit": "%",
    "active": "削除を取り消す",
    "apis": {
      "categories": {
        "index": "プロジェクト・工程を選択する"
      }
    },
    "buttons": {
      "finish": "完了する",
      "revert": "未完了に戻す"
    },
    "category_not_assigined": "プロジェクト・工程なし",
    "confirm": {
      "finish": "完了にしてよろしいですか？",
      "finish_all": "選択した項目を全て完了にしますか？",
      "revert": "未完了に戻してよろしいですか？",
      "revert_all": "選択した項目を全て未完了に戻しますか？"
    },
    "disabled_items": "削除済み",
    "discussion_forum_not_assigined": "電子会議室なし",
    "finish_mark": "[完] ",
    "header": {
      "day_after_tomorrow": "明日以降",
      "out_dated": "期限超過",
      "today": "今日",
      "tomorrow": "明日"
    },
    "links": {
      "finish": "完了する",
      "revert": "未完了に戻す"
    },
    "navi": {
      "category": "プロジェクト・工程"
    },
    "notice": {
      "active": "削除を取り消しました",
      "disable": "削除済みに移動しました"
    },
    "options": {
      "grouping": {
        "category": "プロジェクト・工程",
        "discussion_forum": "電子会議室",
        "end_at": "期限",
        "none": "グループ化なし",
        "user": "担当者"
      },
      "sort": {
        "created_asc": "作成日時(日付順)",
        "created_desc": "作成日時(新着順)",
        "end_at_asc": "期限日(昇順)",
        "end_at_desc": "期限日(降順)",
        "updated_asc": "更新日時(日付順)",
        "updated_desc": "更新日時(新着順)"
      },
      "todo_state": {
        "finished": "完了",
        "progressing": "作業中",
        "unfinished": "未着手"
      },
      "todo_state_filter": {
        "all": "すべて",
        "except_finished": "完了を除く",
        "finished": "完了",
        "progressing": "作業中",
        "unfinished": "未着手"
      }
    },
    "search_todos": "ToDoを検索",
    "todo_over": "期限超過"
  },
  "gws/share": {
    "all": "全てのファイル",
    "apis": {
      "folders": {
        "index": "フォルダーを選択する"
      }
    },
    "category": "共有ファイルカテゴリー",
    "child_folder": "子フォルダー",
    "file": "共有ファイル",
    "files": {
      "disabled_items": "削除済み"
    },
    "folder": "フォルダー一覧",
    "folder_download": "フォルダー内のファイル一括ダウンロード",
    "folder_info": "%{folder} の情報",
    "links": {
      "categories": "カテゴリー",
      "confirm": {
        "download_all": "選択した項目をダウンロードしますか？"
      },
      "file_download": "ダウンロード"
    },
    "mailers": {
      "compressed": {
        "subject": "ダウンロード準備完了のお知らせ"
      }
    },
    "navi": {
      "category": "カテゴリー",
      "folder": "フォルダー"
    },
    "quota": {
      "total_count": "総ファイル数 : %{usage}",
      "total_usage": "総使用量 : %{usage}"
    },
    "url_copy": "クリップボードにコピー"
  },
  "gws/shared_address": {
    "navi": {
      "address": "アドレス設定",
      "group": "グループ設定"
    }
  },
  "gws/staff_record": {
    "confirm": {
      "copy_situation": "現況から所属と職員を作成してよろしいですか？"
    },
    "divide_duties": "電子事務分掌表",
    "errors": {
      "no_data": "公開されている情報はありません。"
    },
    "links": {
      "copy_situation": "現況から所属と職員を作成する"
    },
    "no_charge_name": "（なし）",
    "notice": {
      "copy_situation_started": "現況から所属と職員の作成処理を開始しました。"
    },
    "options": {
      "multi_section": {
        "plural": "兼務",
        "regular": "本務"
      }
    },
    "search": {
      "section": "所属選択"
    },
    "staff_records": "電子職員録",
    "user_histories": "異動履歴"
  },
  "gws/survey": {
    "buttons": {
      "zip_all_files": "添付ファイル"
    },
    "confirm": {
      "download": "ダウンロードしてよろしいですか？",
      "notification_to_unanswered_users": "未回答者に通知を送ってよろしいですか？"
    },
    "file_name": "%{form}の回答",
    "navi": {
      "readable": "受信トレイ"
    },
    "notices": {
      "anonymous": {
        "body": "このアンケートの回答は匿名で登録されます。アンケート管理者は誰が回答したかを特定することはできません。",
        "head": "匿名アンケート"
      },
      "anonymous_state": "匿名回答はアンケート作成時にのみ設定可能です。後から変更することはできません。",
      "count_limit": "最新 %{count} 件を表示しています。",
      "file_state": "回答結果はアンケート作成時にのみ設定可能です。後から変更することはできません。",
      "no_files": "添付ファイルがありません。",
      "notification_job_started": "通知処理を開始しました。"
    },
    "options": {
      "answered_state": {
        "answered": "回答済",
        "both": "両方",
        "unanswered": "未回答"
      },
      "file_edit_state": {
        "disabled": "無効",
        "enabled": "有効",
        "enabled_until_due_date": "締切まで有効"
      },
      "sort": {
        "due_date": "回答期限",
        "updated": "新着順"
      }
    },
    "over_limit": "期限超過",
    "send_notification_to_unanswered_users": "未回答者に通知を送る",
    "tabs": {
      "files": "回答一覧",
      "others": "他人の回答",
      "personal": "自分の回答",
      "summary": "集計"
    },
    "view_files": "回答一覧へ"
  },
  "gws/workflow": {
    "agent_type": {
      "agent": "代理で申請する",
      "myself": "本人が申請する"
    },
    "columns": {
      "index": "入力設定を管理する"
    },
    "forms": {
      "default": "標準申請書",
      "more": "もっと見る"
    },
    "labels": {
      "form": "帳票",
      "user": "作成者"
    },
    "links": {
      "depublish": "非公開にする",
      "download_attachment": "添付ファイルダウンロード",
      "download_comment": "承認/回覧コメントCSV",
      "publish": "公開する"
    },
    "notice": {
      "no_files": "添付ファイルがありません。"
    },
    "options": {
      "agent_state": {
        "disabled": "本人のみ申請可",
        "enabled": "代理申請可"
      },
      "file_state": {
        "all": "すべて",
        "approve": "承認依頼されたもの",
        "request": "承認申請したもの"
      }
    },
    "search_delegatees": {
      "index": "委任者を選択する",
      "search": "検索",
      "select": "委任者を設定する"
    }
  },
  "gws_notification": {
    "gws/board/post": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[掲示板] 「%{name}」に新しい投稿がありました。",
      "text": "%{text}"
    },
    "gws/board/post/destroy": {
      "subject": "[掲示板] 「%{name}」の投稿が削除されました。",
      "text": "%{text}"
    },
    "gws/board/topic": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[掲示板] 「%{name}」が登録または更新されました。",
      "text": "%{text}"
    },
    "gws/board/topic/destroy": {
      "subject": "[掲示板] 「%{name}」が削除されました。",
      "text": ""
    },
    "gws/circular/post": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[回覧板] 「%{name}」が届きました。",
      "text": "%{text}"
    },
    "gws/circular/post/remove": {
      "mail_text": "%{subject}\n",
      "subject": "[回覧板] 「%{name}」が取り下げられました。",
      "text": ""
    },
    "gws/discussion/post": {
      "mail_text": "%{subject}\n\n%{text}\n"
    },
    "gws/discussion/topic": {
      "mail_text": "%{subject}\n\n%{text}\n"
    },
    "gws/faq/post": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[よくある質問] 「%{name}」に新しい投稿がありました。",
      "text": "%{text}"
    },
    "gws/faq/post/destroy": {
      "subject": "[よくある質問] 「%{name}」の投稿が削除されました。",
      "text": ""
    },
    "gws/faq/topic": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[よくある質問] 「%{name}」が登録または更新されました。",
      "text": "%{text}"
    },
    "gws/faq/topic/destroy": {
      "subject": "[よくある質問] 「%{name}」が削除されました。",
      "text": ""
    },
    "gws/monitor/post": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[照会・回答] 「%{name}」に新しい投稿がありました。",
      "text": "%{text}"
    },
    "gws/monitor/post/destroy": {
      "subject": "[照会・回答] 「%{name}」の投稿が削除されました。",
      "text": "%{text}"
    },
    "gws/monitor/topic": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[照会・回答] 「%{name}」が届きました。",
      "text": "%{text}"
    },
    "gws/monitor/topic/destroy": {
      "subject": "[照会・回答] 「%{name}」が削除されました。",
      "text": ""
    },
    "gws/notice/post": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[お知らせ] 「%{name}」が掲載されました。",
      "text": "%{path}"
    },
    "gws/qna/post": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[Ｑ＆Ａ] 「%{name}」に新しい投稿がありました。",
      "text": "%{text}"
    },
    "gws/qna/post/destroy": {
      "subject": "[Ｑ＆Ａ] 「%{name}」の投稿が削除されました。",
      "text": "%{text}"
    },
    "gws/qna/topic": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[Ｑ＆Ａ] 「%{name}」が届きました。",
      "text": "%{text}"
    },
    "gws/qna/topic/destroy": {
      "subject": "[Ｑ＆Ａ] 「%{name}」が削除されました。",
      "text": ""
    },
    "gws/report/file": {
      "mail_text": "%{subject}\n\n%{text}\n"
    },
    "gws/schedule/attendance": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[スケジュール] 「%{name}」の出欠確認に回答がありました。",
      "text": "%{text}"
    },
    "gws/schedule/attendance/destroy": {
      "subject": "[スケジュール] 「%{name}」の出欠確認の回答が削除されました。",
      "text": "%{text}"
    },
    "gws/schedule/comment": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[スケジュール] 「%{name}」にコメントがありました。",
      "text": "%{text}"
    },
    "gws/schedule/comment/destroy": {
      "subject": "[スケジュール] 「%{name}」のコメントが削除されました。",
      "text": "%{text}"
    },
    "gws/schedule/plan": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[スケジュール] 「%{name}」が登録または更新されました。",
      "text": "%{text}"
    },
    "gws/schedule/plan/approval/approve": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[スケジュール] 「%{name}」の承認が完了しました。",
      "text": "%{text}"
    },
    "gws/schedule/plan/approval/remand": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[スケジュール] 「%{name}」の承認依頼が%{from}さんから差し戻されました。",
      "text": "%{text}"
    },
    "gws/schedule/plan/approval/request": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[スケジュール]「%{name}」の承認依頼が届きました。",
      "text": "%{text}"
    },
    "gws/schedule/plan/destroy": {
      "subject": "[スケジュール] 「%{name}」が削除されました。",
      "text": ""
    },
    "gws/schedule/plan/undo_delete": {
      "subject": "[スケジュール] 「%{name}」の削除が取り消されました。",
      "text": "%{text}"
    },
    "gws/schedule/todo": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[ToDo] 「%{name}」が登録または更新されました。",
      "text": "%{text}"
    },
    "gws/schedule/todo/destroy": {
      "subject": "[ToDo] 「%{name}」が削除されました。",
      "text": ""
    },
    "gws/schedule/todo/finish": {
      "mail_text": "%{subject}\n",
      "subject": "[ToDo] 「%{name}」が完了になりました。",
      "text": "%{text}"
    },
    "gws/schedule/todo/revert": {
      "mail_text": "%{subject}\n",
      "subject": "[ToDo] 「%{name}」が未完了になりました。",
      "text": "%{text}"
    },
    "gws/schedule/todo/undo_delete": {
      "mail_text": "%{subject}\n",
      "subject": "[ToDo] 「%{name}」の削除が取り消されました。",
      "text": "%{text}"
    },
    "gws/schedule/todo_comment": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[ToDo] 「%{name}」にコメントがありました。",
      "text": "%{text}"
    },
    "gws/schedule/todo_comment/destroy": {
      "subject": "[ToDo] 「%{name}」のコメントが削除されました。",
      "text": "%{text}"
    },
    "gws/survey/form": {
      "mail_text": "%{subject}\n\n%{text}\n",
      "subject": "[アンケート] 「%{name}」の回答依頼が届きました。",
      "text": "%{path}"
    },
    "gws/workflow/file": {
      "approve": "[ワークフロー]「%{name}」の最終承認が完了しました。",
      "circular": "[ワークフロー]「%{name}」が届きました。",
      "comment": "[ワークフロー]「%{name}」にコメントがありました。",
      "mail_text": "%{subject}\n\n%{text}\n",
      "remand": "[ワークフロー]「%{name}」の承認申請が差し戻されました。",
      "request": "[ワークフロー]「%{name}」の承認申請が届きました。"
    }
  },
  "gws_role": {
    "agent_all_gws_workflow_files": "申請の代理（全て）",
    "agent_private_gws_workflow_files": "申請の代理（自所属）",
    "approve_other_gws_workflow_files": "申請の承認（全て）",
    "approve_private_gws_workflow_files": "申請の承認（所有）",
    "delete_gws_histories": "操作履歴の削除",
    "delete_other_gws_board_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_board_posts": "投稿の削除（全て）",
    "delete_other_gws_circular_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_circular_posts": "回覧板の削除（全て）",
    "delete_other_gws_custom_groups": "カスタムグループの削除（全て）",
    "delete_other_gws_discussion_forums": "電子会議室の削除（全て）",
    "delete_other_gws_discussion_posts": "投稿の削除（全て）",
    "delete_other_gws_discussion_topics": "スレッドの削除（全て）",
    "delete_other_gws_facility_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_facility_items": "設備の削除（全て）",
    "delete_other_gws_faq_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_faq_posts": "投稿の削除（全て）",
    "delete_other_gws_links": "リンク集の削除（全て）",
    "delete_other_gws_memo_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_memo_list_messages": "リストメッセージの削除（全て）",
    "delete_other_gws_memo_lists": "リストの削除（全て）",
    "delete_other_gws_memo_templates": "電話メモの削除（全て）",
    "delete_other_gws_monitor_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_monitor_posts": "投稿の削除（全て）",
    "delete_other_gws_monitor_topics": "記事の削除（全て）",
    "delete_other_gws_notice_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_notice_folders": "フォルダーの削除（全て）",
    "delete_other_gws_notices": "お知らせの削除（全て）",
    "delete_other_gws_portal_group_settings": "部課ポータル設定の削除（全て）",
    "delete_other_gws_portal_user_settings": "個人ポータル設定の削除（全て）",
    "delete_other_gws_qna_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_qna_posts": "投稿の削除（全て）",
    "delete_other_gws_report_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_report_files": "レポートの削除（全て）",
    "delete_other_gws_report_forms": "テンプレートの削除（全て）",
    "delete_other_gws_schedule_categories": "種別の削除（全て）",
    "delete_other_gws_schedule_plans": "予定の削除（全て）",
    "delete_other_gws_schedule_todo_categories": "プロジェクト・工程の削除（全て）",
    "delete_other_gws_schedule_todos": "ToDoの削除（全て）",
    "delete_other_gws_share_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_share_files": "ファイルの削除（全て）",
    "delete_other_gws_share_folders": "フォルダーの削除（全て）",
    "delete_other_gws_shared_address_addresses": "アドレス帳の削除（全て）",
    "delete_other_gws_shared_address_groups": "グループの削除（全て）",
    "delete_other_gws_staff_record_groups": "所属の削除（全て）",
    "delete_other_gws_staff_record_seatings": "座席表の削除（全て）",
    "delete_other_gws_staff_record_users": "職員の削除（全て）",
    "delete_other_gws_staff_record_years": "年度の削除（全て）",
    "delete_other_gws_survey_categories": "カテゴリーの削除（全て）",
    "delete_other_gws_survey_forms": "アンケートの削除（全て）",
    "delete_other_gws_workflow_files": "申請の削除（全て）",
    "delete_other_gws_workflow_forms": "申請フォームの削除（全て）",
    "delete_other_gws_workflow_routes": "承認ルートの削除（全て）",
    "delete_private_gws_board_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_board_posts": "投稿の削除（所有）",
    "delete_private_gws_circular_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_circular_posts": "回覧板の削除（所有）",
    "delete_private_gws_custom_groups": "カスタムグループの削除（所有）",
    "delete_private_gws_discussion_forums": "電子会議室の削除（所有）",
    "delete_private_gws_discussion_posts": "投稿の削除（所有）",
    "delete_private_gws_discussion_topics": "スレッドの削除（所有）",
    "delete_private_gws_facility_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_facility_items": "設備の削除（所有）",
    "delete_private_gws_faq_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_faq_posts": "投稿の削除（所有）",
    "delete_private_gws_links": "リンク集の削除（所有）",
    "delete_private_gws_memo_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_memo_list_messages": "リストメッセージの削除（所有）",
    "delete_private_gws_memo_lists": "リストの削除（所有）",
    "delete_private_gws_memo_templates": "電話メモの削除（所有）",
    "delete_private_gws_monitor_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_monitor_posts": "投稿の削除（所有）",
    "delete_private_gws_monitor_topics": "記事の削除（所有）",
    "delete_private_gws_notice_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_notice_folders": "フォルダーの削除（所有）",
    "delete_private_gws_notices": "お知らせの削除（所有）",
    "delete_private_gws_portal_group_settings": "部課ポータル設定の削除（所有）",
    "delete_private_gws_portal_user_settings": "個人ポータル設定の削除（所有）",
    "delete_private_gws_qna_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_qna_posts": "投稿の削除（所有）",
    "delete_private_gws_report_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_report_files": "レポートの削除（所有）",
    "delete_private_gws_report_forms": "テンプレートの削除（所有）",
    "delete_private_gws_schedule_categories": "種別の削除（所有）",
    "delete_private_gws_schedule_plans": "予定の削除（所有）",
    "delete_private_gws_schedule_todo_categories": "プロジェクト・工程の削除（所有）",
    "delete_private_gws_schedule_todos": "ToDoの削除（所有）",
    "delete_private_gws_share_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_share_files": "ファイルの削除（所有）",
    "delete_private_gws_share_folders": "フォルダーの削除（所有）",
    "delete_private_gws_shared_address_addresses": "アドレス帳の削除（所有）",
    "delete_private_gws_shared_address_groups": "グループの削除（所有）",
    "delete_private_gws_staff_record_groups": "所属の削除（所有）",
    "delete_private_gws_staff_record_seatings": "座席表の削除（所有）",
    "delete_private_gws_staff_record_users": "職員の削除（所有）",
    "delete_private_gws_staff_record_years": "年度の削除（所有）",
    "delete_private_gws_survey_categories": "カテゴリーの削除（所有）",
    "delete_private_gws_survey_forms": "アンケートの削除（所有）",
    "delete_private_gws_workflow_files": "申請の削除（所有）",
    "delete_private_gws_workflow_forms": "申請フォームの削除（所有）",
    "delete_private_gws_workflow_routes": "承認ルートの削除（所有）",
    "download_other_gws_share_folders": "一括ダウンロード（全て）",
    "download_private_gws_share_folders": "一括ダウンロード（所有）",
    "edit_gws_attendance_time_cards": "出退勤時刻の変更",
    "edit_gws_bookmarks": "お気に入りの利用",
    "edit_gws_chorg_revisions": "組織変更の管理",
    "edit_gws_contrasts": "コントラストの管理",
    "edit_gws_groups": "グループの管理",
    "edit_gws_personal_addresses": "個人アドレス帳の利用",
    "edit_gws_roles": "権限/ロールの管理",
    "edit_gws_schedule_holidays": "休日の管理",
    "edit_gws_user_forms": "ユーザ拡張情報の管理",
    "edit_gws_user_titles": "役職の管理",
    "edit_gws_users": "ユーザの管理",
    "edit_other_gws_board_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_board_posts": "投稿の編集（全て）",
    "edit_other_gws_circular_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_circular_posts": "回覧板の編集（全て）",
    "edit_other_gws_custom_groups": "カスタムグループの編集（全て）",
    "edit_other_gws_discussion_forums": "電子会議室の編集（全て）",
    "edit_other_gws_discussion_posts": "投稿の編集（全て）",
    "edit_other_gws_discussion_topics": "スレッドの編集（全て）",
    "edit_other_gws_facility_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_facility_items": "設備の編集（全て）",
    "edit_other_gws_faq_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_faq_posts": "投稿の編集（全て）",
    "edit_other_gws_links": "リンク集の編集（全て）",
    "edit_other_gws_memo_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_memo_list_messages": "リストメッセージの編集（全て）",
    "edit_other_gws_memo_lists": "リストの編集（全て）",
    "edit_other_gws_memo_templates": "電話メモの編集（全て）",
    "edit_other_gws_monitor_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_monitor_posts": "投稿の編集（全て）",
    "edit_other_gws_monitor_topics": "記事の編集（全て）",
    "edit_other_gws_notice_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_notice_folders": "フォルダーの編集（全て）",
    "edit_other_gws_notices": "お知らせの編集（全て）",
    "edit_other_gws_portal_group_settings": "部課ポータル設定の編集（全て）",
    "edit_other_gws_portal_user_settings": "個人ポータル設定の編集（全て）",
    "edit_other_gws_qna_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_qna_posts": "投稿の編集（全て）",
    "edit_other_gws_report_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_report_files": "レポートの編集（全て）",
    "edit_other_gws_report_forms": "テンプレートの編集（全て）",
    "edit_other_gws_schedule_categories": "種別の編集（全て）",
    "edit_other_gws_schedule_plans": "予定の編集（全て）",
    "edit_other_gws_schedule_todo_categories": "プロジェクト・工程の編集（全て）",
    "edit_other_gws_schedule_todos": "ToDoの編集（全て）",
    "edit_other_gws_share_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_share_files": "ファイルの編集（全て）",
    "edit_other_gws_share_folders": "フォルダーの編集（全て）",
    "edit_other_gws_shared_address_addresses": "アドレス帳の編集（全て）",
    "edit_other_gws_shared_address_groups": "グループの編集（全て）",
    "edit_other_gws_staff_record_charges": "担当の編集（全て）",
    "edit_other_gws_staff_record_groups": "所属の編集（全て）",
    "edit_other_gws_staff_record_seatings": "座席表の編集（全て）",
    "edit_other_gws_staff_record_users": "職員の編集（全て）",
    "edit_other_gws_staff_record_years": "年度の編集（全て）",
    "edit_other_gws_survey_categories": "カテゴリーの編集（全て）",
    "edit_other_gws_survey_forms": "アンケートの編集（全て）",
    "edit_other_gws_workflow_files": "申請の編集（全て）",
    "edit_other_gws_workflow_forms": "申請フォームの編集（全て）",
    "edit_other_gws_workflow_routes": "承認ルートの編集（全て）",
    "edit_private_gws_board_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_board_posts": "投稿の編集（所有）",
    "edit_private_gws_circular_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_circular_posts": "回覧板の編集（所有）",
    "edit_private_gws_custom_groups": "カスタムグループの編集（所有）",
    "edit_private_gws_discussion_forums": "電子会議室の編集（所有）",
    "edit_private_gws_discussion_posts": "投稿の編集（所有）",
    "edit_private_gws_discussion_topics": "スレッドの編集（所有）",
    "edit_private_gws_facility_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_facility_items": "設備の編集（所有）",
    "edit_private_gws_faq_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_faq_posts": "投稿の編集（所有）",
    "edit_private_gws_links": "リンク集の編集（所有）",
    "edit_private_gws_memo_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_memo_list_messages": "リストメッセージの編集（所有）",
    "edit_private_gws_memo_lists": "リストの編集（所有）",
    "edit_private_gws_memo_messages": "メッセージの利用",
    "edit_private_gws_memo_templates": "電話メモの編集（所有）",
    "edit_private_gws_monitor_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_monitor_posts": "投稿の編集（所有）",
    "edit_private_gws_monitor_topics": "記事の編集（所有）",
    "edit_private_gws_notice_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_notice_folders": "フォルダーの編集（所有）",
    "edit_private_gws_notices": "お知らせの編集（所有）",
    "edit_private_gws_portal_group_settings": "部課ポータル設定の編集（所有）",
    "edit_private_gws_portal_user_settings": "個人ポータル設定の編集（所有）",
    "edit_private_gws_qna_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_qna_posts": "投稿の編集（所有）",
    "edit_private_gws_report_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_report_files": "レポートの編集（所有）",
    "edit_private_gws_report_forms": "テンプレートの編集（所有）",
    "edit_private_gws_schedule_categories": "種別の編集（所有）",
    "edit_private_gws_schedule_plans": "予定の編集（所有）",
    "edit_private_gws_schedule_todo_categories": "プロジェクト・工程の編集（所有）",
    "edit_private_gws_schedule_todos": "ToDoの編集（所有）",
    "edit_private_gws_share_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_share_files": "ファイルの編集（所有）",
    "edit_private_gws_share_folders": "フォルダーの編集（所有）",
    "edit_private_gws_shared_address_addresses": "アドレス帳の編集（所有）",
    "edit_private_gws_shared_address_groups": "グループの編集（所有）",
    "edit_private_gws_staff_record_charges": "担当の編集（所有）",
    "edit_private_gws_staff_record_groups": "所属の編集（所有）",
    "edit_private_gws_staff_record_seatings": "座席表の編集（所有）",
    "edit_private_gws_staff_record_users": "職員の編集（所有）",
    "edit_private_gws_staff_record_years": "年度の編集（所有）",
    "edit_private_gws_survey_categories": "カテゴリーの編集（所有）",
    "edit_private_gws_survey_forms": "アンケートの編集（所有）",
    "edit_private_gws_workflow_files": "申請の編集（所有）",
    "edit_private_gws_workflow_forms": "申請フォームの編集（所有）",
    "edit_private_gws_workflow_routes": "承認ルートの編集（所有）",
    "manage_all_gws_attendance_time_cards": "出退勤の管理（全て）",
    "manage_all_gws_user_presences": "在席状況の管理（全て）",
    "manage_custom_group_gws_user_presences": "在席状況の管理（所属カスタムグループ）",
    "manage_private_gws_attendance_time_cards": "出退勤の管理（自所属）",
    "manage_private_gws_user_presences": "在席状況の管理（自所属）",
    "my_folder_private_gws_notice_folders": "自所属フォルダーの作成",
    "read_gws_histories": "操作履歴の閲覧",
    "read_gws_job_logs": "ジョブ実行履歴の閲覧",
    "read_gws_organization": "組織情報の閲覧",
    "read_other_gws_board_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_board_posts": "投稿の閲覧（全て）",
    "read_other_gws_circular_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_circular_posts": "回覧板の閲覧（全て）",
    "read_other_gws_custom_groups": "カスタムグループの閲覧（全て）",
    "read_other_gws_discussion_forums": "電子会議室の閲覧（全て）",
    "read_other_gws_discussion_topics": "スレッドの閲覧（全て）",
    "read_other_gws_facility_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_facility_items": "設備の閲覧（全て）",
    "read_other_gws_faq_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_faq_posts": "投稿の閲覧（全て）",
    "read_other_gws_links": "リンク集の閲覧（全て）",
    "read_other_gws_memo_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_memo_list_messages": "リストメッセージの閲覧（全て）",
    "read_other_gws_memo_lists": "リストの閲覧（全て）",
    "read_other_gws_memo_templates": "電話メモの閲覧（全て）",
    "read_other_gws_monitor_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_monitor_posts": "投稿の閲覧（全て）",
    "read_other_gws_monitor_topics": "記事の閲覧（全て）",
    "read_other_gws_notice_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_notice_folders": "フォルダーの閲覧（全て）",
    "read_other_gws_notices": "お知らせの閲覧（全て）",
    "read_other_gws_portal_group_settings": "部課ポータル設定の閲覧（全て）",
    "read_other_gws_portal_user_settings": "個人ポータル設定の閲覧（全て）",
    "read_other_gws_qna_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_qna_posts": "投稿の閲覧（全て）",
    "read_other_gws_report_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_report_files": "レポートの閲覧（全て）",
    "read_other_gws_report_forms": "テンプレートの閲覧（全て）",
    "read_other_gws_schedule_categories": "種別の閲覧（全て）",
    "read_other_gws_schedule_plans": "予定の閲覧（全て）",
    "read_other_gws_schedule_todo_categories": "プロジェクト・工程の閲覧（全て）",
    "read_other_gws_schedule_todos": "ToDoの閲覧（全て）",
    "read_other_gws_share_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_share_files": "ファイルの閲覧（全て）",
    "read_other_gws_share_folders": "フォルダーの閲覧（全て）",
    "read_other_gws_shared_address_addresses": "アドレス帳の閲覧（全て）",
    "read_other_gws_shared_address_groups": "グループの閲覧（全て）",
    "read_other_gws_staff_record_groups": "所属の閲覧（全て）",
    "read_other_gws_staff_record_seatings": "座席表の閲覧（全て）",
    "read_other_gws_staff_record_users": "職員の閲覧（全て）",
    "read_other_gws_staff_record_years": "年度の閲覧（全て）",
    "read_other_gws_survey_categories": "カテゴリーの閲覧（全て）",
    "read_other_gws_survey_forms": "アンケートの閲覧（全て）",
    "read_other_gws_workflow_files": "申請の閲覧（全て）",
    "read_other_gws_workflow_forms": "申請フォームの閲覧（全て）",
    "read_other_gws_workflow_routes": "承認ルートの閲覧（全て）",
    "read_private_gws_board_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_board_posts": "投稿の閲覧（所有）",
    "read_private_gws_circular_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_circular_posts": "回覧板の閲覧（所有）",
    "read_private_gws_custom_groups": "カスタムグループの閲覧（所有）",
    "read_private_gws_discussion_forums": "電子会議室の閲覧（所有）",
    "read_private_gws_discussion_topics": "スレッドの閲覧（所有）",
    "read_private_gws_facility_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_facility_items": "設備の閲覧（所有）",
    "read_private_gws_faq_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_faq_posts": "投稿の閲覧（所有）",
    "read_private_gws_links": "リンク集の閲覧（所有）",
    "read_private_gws_memo_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_memo_list_messages": "リストメッセージの閲覧（所有）",
    "read_private_gws_memo_lists": "リストの閲覧（所有）",
    "read_private_gws_memo_templates": "電話メモの閲覧（所有）",
    "read_private_gws_monitor_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_monitor_posts": "投稿の閲覧（所有）",
    "read_private_gws_monitor_topics": "記事の閲覧（所有）",
    "read_private_gws_notice_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_notice_folders": "フォルダーの閲覧（所有）",
    "read_private_gws_notices": "お知らせの閲覧（所有）",
    "read_private_gws_portal_group_settings": "部課ポータル設定の閲覧（所有）",
    "read_private_gws_portal_user_settings": "個人ポータル設定の閲覧（所有）",
    "read_private_gws_qna_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_qna_posts": "投稿の閲覧（所有）",
    "read_private_gws_report_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_report_files": "レポートの閲覧（所有）",
    "read_private_gws_report_forms": "テンプレートの閲覧（所有）",
    "read_private_gws_schedule_categories": "種別の閲覧（所有）",
    "read_private_gws_schedule_plans": "予定の閲覧（所有）",
    "read_private_gws_schedule_todo_categories": "プロジェクト・工程の閲覧（所有）",
    "read_private_gws_schedule_todos": "ToDoの閲覧（所有）",
    "read_private_gws_share_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_share_files": "ファイルの閲覧（所有）",
    "read_private_gws_share_folders": "フォルダーの閲覧（所有）",
    "read_private_gws_shared_address_addresses": "アドレス帳の閲覧（所有）",
    "read_private_gws_shared_address_groups": "グループの閲覧（所有）",
    "read_private_gws_staff_record_groups": "所属の閲覧（所有）",
    "read_private_gws_staff_record_seatings": "座席表の閲覧（所有）",
    "read_private_gws_staff_record_users": "職員の閲覧（所有）",
    "read_private_gws_staff_record_years": "年度の閲覧（所有）",
    "read_private_gws_survey_categories": "カテゴリーの閲覧（所有）",
    "read_private_gws_survey_forms": "アンケートの閲覧（所有）",
    "read_private_gws_workflow_files": "申請の閲覧（所有）",
    "read_private_gws_workflow_forms": "申請フォームの閲覧（所有）",
    "read_private_gws_workflow_routes": "承認ルートの閲覧（所有）",
    "reroute_other_gws_workflow_files": "申請の経路変更（全て）",
    "reroute_private_gws_workflow_files": "申請の経路変更（所有）",
    "send_other_gws_memo_list_messages": "リストメッセージの送信（全て）",
    "send_private_gws_memo_list_messages": "リストメッセージの送信（所有）",
    "trash_other_gws_board_posts": "投稿ゴミ箱の管理（全て）",
    "trash_other_gws_circular_posts": "回覧板ゴミ箱の管理（全て）",
    "trash_other_gws_discussion_forums": "電子会議室ゴミ箱の管理（全て）",
    "trash_other_gws_faq_posts": "投稿ゴミ箱の管理（全て）",
    "trash_other_gws_monitor_posts": "投稿ゴミ箱の管理（全て）",
    "trash_other_gws_notices": "お知らせゴミ箱の管理（全て）",
    "trash_other_gws_qna_posts": "投稿ゴミ箱の管理（全て）",
    "trash_other_gws_report_files": "レポートゴミ箱の管理（全て）",
    "trash_other_gws_schedule_plans": "予定ゴミ箱の管理（全て）",
    "trash_other_gws_schedule_todos": "ToDoゴミ箱の管理（全て）",
    "trash_other_gws_share_files": "ファイルゴミ箱の管理（全て）",
    "trash_other_gws_shared_address_addresses": "アドレス帳ゴミ箱の管理（全て）",
    "trash_other_gws_survey_forms": "アンケートゴミ箱の管理（全て）",
    "trash_other_gws_workflow_files": "申請ゴミ箱の管理（全て）",
    "trash_private_gws_board_posts": "投稿ゴミ箱の管理（所有）",
    "trash_private_gws_circular_posts": "回覧板ゴミ箱の管理（所有）",
    "trash_private_gws_discussion_forums": "電子会議室ゴミ箱の管理（所有）",
    "trash_private_gws_faq_posts": "投稿ゴミ箱の管理（所有）",
    "trash_private_gws_monitor_posts": "投稿ゴミ箱の管理（所有）",
    "trash_private_gws_notices": "お知らせゴミ箱の管理（所有）",
    "trash_private_gws_qna_posts": "投稿ゴミ箱の管理（所有）",
    "trash_private_gws_report_files": "レポートゴミ箱の管理（所有）",
    "trash_private_gws_schedule_plans": "予定ゴミ箱の管理（所有）",
    "trash_private_gws_schedule_todos": "ToDoゴミ箱の管理（所有）",
    "trash_private_gws_share_files": "ファイルゴミ箱の管理（所有）",
    "trash_private_gws_shared_address_addresses": "アドレス帳ゴミ箱の管理（所有）",
    "trash_private_gws_survey_forms": "アンケートゴミ箱の管理（所有）",
    "trash_private_gws_workflow_files": "申請ゴミ箱の管理（所有）",
    "unlock_other_gws_share_files": "ページのロック解除（全て）",
    "use_gws_attendance_time_cards": "出退勤時刻の利用",
    "use_gws_board": "掲示板の利用",
    "use_gws_circular": "回覧板の利用",
    "use_gws_discussion": "電子会議室の利用",
    "use_gws_elasticsearch": "全文検索の利用",
    "use_gws_faq": "よくある質問の利用",
    "use_gws_monitor": "照会・回答の利用",
    "use_gws_notice": "お知らせの利用",
    "use_gws_qna": "Ｑ＆Ａの利用",
    "use_gws_report": "レポートの利用",
    "use_gws_share": "共有ファイルの利用",
    "use_gws_shared_address": "共有アドレス帳の利用",
    "use_gws_staff_record": "電子職員録の利用",
    "use_gws_survey": "アンケートの利用",
    "use_gws_user_presences": "在席状況の利用",
    "use_gws_workflow": "ワークフローの利用",
    "use_private_gws_facility_plans": "設備予約の利用",
    "use_private_gws_schedule_plans": "予定の利用",
    "use_private_gws_schedule_todos": "ToDoの利用",
    "write_other_gws_share_files": "ファイルのアップロード（全て）",
    "write_private_gws_share_files": "ファイルのアップロード（所有）"
  },
  "helpers": {
    "page_entries_info": {
      "entry": {
        "one": "entry",
        "other": "entries",
        "zero": "entries"
      },
      "more_pages": {
        "display_entries": "Displaying %{entry_name} <b>%{first}&nbsp;-&nbsp;%{last}</b> of <b>%{total}</b> in total"
      },
      "one_page": {
        "display_entries": {
          "one": "Displaying <b>1</b> %{entry_name}",
          "other": "Displaying <b>all %{count}</b> %{entry_name}",
          "zero": "No %{entry_name} found"
        }
      }
    },
    "select": {
      "prompt": "選択してください。"
    },
    "submit": {
      "create": "登録する",
      "submit": "保存する",
      "update": "更新する",
      "upload": "アップロード"
    }
  },
  "history": {
    "action": "アクション",
    "backup": "バックアップ",
    "backup_version": "バックアップ時のバージョン",
    "before_state": "変更前の状態",
    "buttons": {
      "restore": "復元"
    },
    "compare_before_state": "変更前の状態と比較",
    "confirm": {
      "restore": "復元してよろしいですか？"
    },
    "current_state": "現在の状態",
    "current_version": "現在のバージョン",
    "log": "操作履歴",
    "notice": {
      "restore": "システムのバージョンが異なる場合、正常に動作しなくなる可能性があります。",
      "restored": "復元しました。"
    },
    "options": {
      "target": {
        "restore": "復元する",
        "unrestore": "復元しない"
      }
    },
    "restore": "復元する",
    "save_term": {
      "2_months": "２ヶ月",
      "2_weeks": "２週間",
      "3_months": "３ヶ月",
      "6_months": "６ヶ月",
      "all_delete": "すべて削除",
      "all_save": "すべて保存",
      "day": "１日",
      "month": "１ヶ月",
      "week": "１週間",
      "year": "１年"
    },
    "target": "操作対象",
    "user": "ユーザー",
    "view_diff": "差分を見る"
  },
  "inquiry": {
    "aggregate": "集計",
    "answer": "回答データ",
    "cancel": "変更する",
    "cannot_use": "（使用不可）",
    "column": "質問項目",
    "confirm": "確認画面へ",
    "confirm_input": "%{name}確認用",
    "confirm_input_description": "もう一度、同じ%{name}を入力してください。",
    "confirm_message": "下記事項をご確認の上、送信ボタンを押してください。",
    "feedback": "フィードバック",
    "form": "メールフォーム",
    "from": "から",
    "links": {
      "back_to_page": "元のページに戻る",
      "faq": "FAQを新規作成"
    },
    "nodes": "フォーム一覧",
    "notify": "自動通知",
    "options": {
      "answer_state": {
        "closed": "完了",
        "open": "未対応",
        "processed": "処理済み",
        "processing": "処理中"
      },
      "input_confirm": {
        "disabled": "しない",
        "enabled": "する"
      },
      "input_type": {
        "check_box": "チェックボックス選択",
        "email_field": "メールアドレス",
        "form_select": "フォーム選択",
        "radio_button": "ラジオボタン選択",
        "select": "プルダウン選択",
        "text_area": "テキストエリア",
        "text_field": "テキストボックス",
        "upload_file": "ファイル投稿"
      },
      "notice_content": {
        "include_answers": "投稿内容含む",
        "link_only": "通知のみ"
      },
      "required": {
        "optional": "任意",
        "required": "必須"
      },
      "search_answer_state": {
        "all": "すべて",
        "closed": "完了",
        "open": "未対応",
        "processed": "処理済み",
        "processing": "処理中",
        "unclosed": "完了以外"
      },
      "state": {
        "disabled": "使用しない",
        "enabled": "使用する"
      }
    },
    "reception_plan": "回答受付期間",
    "reply": "自動返信",
    "required_field": "※必須入力",
    "result": "集計結果",
    "submit": "送信する",
    "total_count": "総回答数"
  },
  "jmaxml": {
    "apis": {
      "forecast_regions": {
        "index": "区域を選択する",
        "search": "区域を検索",
        "select": "区域を設定する"
      },
      "quake_regions": {
        "index": "区域を選択する",
        "search": "区域を検索",
        "select": "区域を設定する"
      },
      "tsunami_regions": {
        "index": "区域を選択する",
        "search": "区域を検索",
        "select": "区域を設定する"
      },
      "water_level_stations": {
        "index": "水位観測所を選択する",
        "search": "水位観測所を検索",
        "select": "水位観測所を設定する"
      }
    },
    "manage_filter": "フィルターを管理する",
    "options": {
      "ash_fall_sub_type": {
        "detail": "詳細",
        "flash": "速報",
        "regular": "定時"
      },
      "tsunami_sub_type": {
        "alert": "津波警報",
        "forecast": "津波予報",
        "special_alert": "大津波警報",
        "warning": "津波注意報"
      },
      "weather_alert_sub_type": {
        "alert": "警報",
        "special_alert": "特別警報",
        "warning": "注意報"
      }
    },
    "region": "気象庁区域"
  },
  "job": {
    "buttons": {
      "reset": "停止する",
      "restore": "復元"
    },
    "confirm": {
      "restore": "復元してよろしいですか？"
    },
    "download_log": "ログのダウンロード",
    "log": "実行履歴",
    "log_notice": "最大 %{count} 件を表示しています。",
    "main": "ジョブ",
    "models": {
      "article/page/import_job": "記事ページインポート",
      "chat/intent/import_job": "シナリオインポート",
      "chorg/main_runner": "組織変更/本番実行",
      "chorg/test_runner": "組織変更/テスト実行",
      "cms/all_contents_import_job": "全コンテンツ一括設定",
      "cms/check_links_job": "リンクチェック",
      "cms/import_files_job": "ページ/フォルダー取り込み",
      "cms/node/copy_nodes_job": "フォルダー複製",
      "cms/node/generate_job": "フォルダー書き出し",
      "cms/page/generate_job": "ページ書き出し",
      "cms/page/release_job": "ページ公開",
      "cms/page/remove_job": "ページ削除",
      "cms/page/update_job": "ページ更新",
      "cms/role/import_job": "権限インポート",
      "event/ical/import_job": "iCalインポート",
      "event/page/import_job": "イベントページインポート",
      "ezine/deliver_job": "単メール配信",
      "ezine/deliver_reserved_job": "メール配信",
      "facility/import_job": "施設情報インポート",
      "faq/page/import_job": "FAQインポート",
      "garbage/import_job": "ゴミ品目インポート",
      "gws/board/trash_purge_job": "掲示板/投稿ゴミ箱の掃除",
      "gws/chorg/main_runner": "組織変更/本番実行",
      "gws/chorg/test_runner": "組織変更/テスト実行",
      "gws/circular/trash_purge_job": "回覧板ゴミ箱の掃除",
      "gws/compress_job": "ファイル/圧縮ダウンロード",
      "gws/discussion/trash_purge_job": "電子会議室ゴミ箱の掃除",
      "gws/elasticsearch/indexer/board_post_job": "掲示板投稿インデクサー",
      "gws/elasticsearch/indexer/board_topic_job": "掲示板インデクサー",
      "gws/elasticsearch/indexer/circular_comment_job": "回覧板インデクサー",
      "gws/elasticsearch/indexer/circular_post_job": "回覧板インデクサー",
      "gws/elasticsearch/indexer/faq_post_job": "FAQインデクサー",
      "gws/elasticsearch/indexer/faq_topic_job": "FAQインデクサー",
      "gws/elasticsearch/indexer/memo_message_job": "連絡メモインデクサー",
      "gws/elasticsearch/indexer/monitor_post_job": "照会・回答インデクサー",
      "gws/elasticsearch/indexer/monitor_topic_job": "照会・回答インデクサー",
      "gws/elasticsearch/indexer/qna_post_job": "Ｑ＆Ａインデクサー",
      "gws/elasticsearch/indexer/qna_topic_job": "Ｑ＆Ａインデクサー",
      "gws/elasticsearch/indexer/report_file_job": "レポートインデクサー",
      "gws/elasticsearch/indexer/share_file_job": "共有ファイルインデクサー",
      "gws/elasticsearch/indexer/workflow_file_job": "ワークフローインデクサー",
      "gws/faq/trash_purge_job": "よくある質問/投稿ゴミ箱の掃除",
      "gws/history_archive_job": "操作履歴アーカイブ作成",
      "gws/memo/message_export_job": "メッセージ/エクスポート",
      "gws/monitor/trash_purge_job": "照会・回答/投稿ゴミ箱の掃除",
      "gws/notice/notification_job": "お知らせ通知",
      "gws/notice/trash_purge_job": "お知らせゴミ箱の掃除",
      "gws/qna/trash_purge_job": "Ｑ＆Ａ/投稿ゴミ箱の掃除",
      "gws/reminder/notification_job": "リマインダー通知",
      "gws/report/notification_job": "レポート通知",
      "gws/report/trash_purge_job": "レポートゴミ箱の掃除",
      "gws/schedule/todo_trash_purge_job": "ToDoゴミ箱の掃除",
      "gws/schedule/trash_purge_job": "予定ゴミ箱の掃除",
      "gws/share/trash_purge_job": "共有ファイル/ゴミ箱の掃除",
      "gws/shared_address/trash_purge_job": "共有アドレス/ゴミ箱の掃除",
      "gws/staff_record/copy_situation_job": "電子職員録現況コピージョブ",
      "gws/survey/notification_job": "アンケート通知",
      "gws/survey/trash_purge_job": "アンケートゴミ箱の掃除",
      "gws/workflow/trash_purge_job": "ワークフロー/申請ゴミ箱の掃除",
      "jmaxml/forecast_region_import_job": "気象情報区域取込",
      "jmaxml/quake_region_import_job": "地震情報区域取込",
      "jmaxml/tsunami_region_import_job": "津波予報区取込",
      "jmaxml/water_level_station_import_job": "水観測所取込",
      "ldap/import_job": "LDAPインポート",
      "ldap/sync_job": "LDAP同期",
      "mail_page/import_job": "メール取込",
      "opendata/cms_integration/assoc_job": "記事連携設定ジョブ",
      "opendata/csv2rdf_converter/job": "RDF変換ジョブ",
      "opendata/dataset/import_job": "データセットインポートジョブ",
      "opendata/facility/assoc_job": "施設CSV取り込みジョブ",
      "opendata/harvest/destroy_datasets_job": "ハーベスト関連データセット削除ジョブ",
      "opendata/harvest/export_datasets_job": "ハーベストエクスポート削除ジョブ",
      "opendata/harvest/harvest_datasets_job": "ハーベストジョブ",
      "opendata/harvest/import_datasets_job": "ハーベストインポートジョブ",
      "opendata/notify_dataset_plan_job": "データセット更新通知ジョブ",
      "rdf/vocab_import_job": "RDF語彙インポート",
      "recommend/create_similarity_scores_job": "レコメンドスコア計算",
      "recommend/destroy_history_logs_job": "レコメンドログ削除",
      "recommend/destroy_similarity_scores_job": "レコメンドスコア削除",
      "rss/execute_weather_xml_filters_job": "気象庁防災情報XMLフィルター処理",
      "rss/import_from_file_job": "RSSファイル取込",
      "rss/import_job": "RSS取込",
      "rss/import_weather_xml_job": "気象庁防災情報XML取込",
      "ss/public_file_remover_job": "公開済みファイル削除ジョブ",
      "sys/postal_code/import_job": "郵便番号インポート",
      "sys/postal_code/official_csv_import_job": "日本郵便CSVインポート",
      "sys/prefecture_code/import_job": "地域コードインポート",
      "sys/site_copy_job": "サイト複製",
      "voice/synthesis_job": "音声読み上げ",
      "webmail/history_archive_job": "操作履歴アーカイブ作成",
      "webmail/role_import_job": "ロール/権限インポート"
    },
    "notice": {
      "reseted_state": "状態を初期化しました。",
      "restore": "システムのバージョンが異なる場合、正常に動作しなくなる可能性があります。",
      "restored": "復元しました。",
      "size_limit_exceeded": "同時に実行できるジョブ数を超過しています。"
    },
    "queue_adapter_errors": {
      "adapter_is_not_shirasagi": [
        "ActiveJob の queue_adapter 設定が shirasagi ではありません。",
        "本画面には queue_adapter 設定が shirasagi の場合に実行予約されたタスクが表示されます。"
      ],
      "body": "次の項目を確認してください。",
      "header": "ActiveJob の設定を確認してください。"
    },
    "reservation": "実行予約",
    "restore": "復元する",
    "save_term": {
      "all_delete": "すべて削除",
      "all_save": "すべて保存",
      "day": "１日",
      "month": "１ヶ月",
      "year": "１年"
    },
    "state": {
      "completed": "完了",
      "failed": "失敗",
      "running": "実行中",
      "start": "開始",
      "stop": "停止"
    },
    "task": "タスク",
    "task_manager": "タスク・マネージャー",
    "view_diff": "差分を見る"
  },
  "kana": {
    "build_fail": {
      "index": "かな辞書を作成できません。",
      "no_content": "登録データが見つかりません。",
      "no_mecab_dicdir": "MeCab 辞書がインストールされていません。",
      "no_mecab_indexer": "MeCab 辞書ビルドプログラムがインストールされていません。"
    },
    "build_success": "辞書の作成に成功しました。",
    "buttons": {
      "build_kana_dictionary": "反映"
    },
    "dictionary": "かな辞書",
    "links": {
      "build_kana_dictionary": "辞書反映"
    },
    "views": {
      "dictionaries/build_confirmation": {
        "build_description": "以下のかな辞書から辞書をビルドし、システムに反映します。",
        "build_header": "辞書を反映してよろしいですか？"
      }
    }
  },
  "key_visual": {
    "controls": {
      "start": "再生",
      "stop": "停止"
    },
    "image": "画像",
    "options": {
      "link_target": {
        "blank": "別のタブで表示",
        "self": "同じタブで表示"
      }
    }
  },
  "ldap": {
    "buttons": {
      "import": "インポート",
      "sync": "同期"
    },
    "confirm": {
      "import": "インポートしてよろしいですか？",
      "import_description": "LDAPサーバから情報をインポートし、中間情報を作成します。",
      "sync": "同期してよろしいですか？"
    },
    "errors": {
      "connection_setting_not_found": "LDAP 接続情報が設定されていません。",
      "has_multiple_root_groups": "サイト: %{site} は複数のルートグループが設定されています。"
    },
    "import": "インポート",
    "links": {
      "ldap": "LDAP",
      "sync": "同期する"
    },
    "messages": {
      "group_moved": "%{user_name} がグループ「%{group_name}」へ移動しました。",
      "import_started": "インポート処理を開始しました。",
      "no_groups": "グループが見つかりません。",
      "no_users": "ユーザが見つかりません。",
      "sync_already_started": "同期処理は開始されています。",
      "sync_started": "同期処理を開始しました。",
      "sync_success": "同期に成功しました。グループ数: %{group_count}、ユーザー数: %{user_count}"
    },
    "result": "同期結果",
    "server": "サーバー情報",
    "views": {
      "import/sync": {
        "delete": "削除",
        "error": "エラー",
        "fail": "失敗",
        "group": "グループ",
        "header": "同期結果",
        "no_results": "結果がありません",
        "success": "更新",
        "task_info": "タスク",
        "user": "ユーザー",
        "warning": "警告"
      },
      "server/index": {
        "group": {
          "group": "グループ",
          "name": "名前",
          "root": "ルート"
        },
        "user": {
          "email": "email",
          "name": "名前",
          "user": "ユーザ"
        }
      }
    }
  },
  "mail_page": {
    "page": "メール取込ページ"
  },
  "map": {
    "alert": {
      "invalid_center": "座標を取得できませんでした。",
      "invalid_location": [
        "正しい座標をカンマ(,)区切りで入力してください。",
        "例）33.8957612,133.6806607"
      ]
    },
    "buttons": {
      "add_marker": "マーカーを追加する",
      "clear_marker": "削除",
      "set_marker": "マーカーの設置"
    },
    "clicked": "クリック座標",
    "confirm": {
      "delete_marker": "マーカーを削除してよろしいですか？",
      "find_exif": "画像に位置情報が含まれています。位置情報を地図に設定しますか？"
    },
    "loc": "位置",
    "map": "地図",
    "markers": "マーカー設定",
    "page": "地図記事",
    "search": "地名を検索",
    "setting": "マップ設定",
    "zoom": "ズーム"
  },
  "member": {
    "blog_layout": "ブログレイアウト",
    "buttons": {
      "accept": "参加する",
      "address_search": "住所検索",
      "back": "戻る",
      "change_password": "パスワードを変更",
      "confirm": "確認画面へ",
      "leave": "退会する",
      "register": "登録",
      "reject": "辞退する",
      "resend_confirmation_mail": "確認メールを再送",
      "send": "送信する"
    },
    "confirm": {
      "group": {
        "accept": "グループに参加しますか？",
        "reject": "グループへの参加を辞退しますか？"
      },
      "leave": "ボタンをクリックすると退会します。よろしいですか。",
      "post_gpf": "Google Person Finder に登録してよろしいですか？"
    },
    "group": "グループ",
    "group_member": "グループメンバー",
    "links": {
      "blog_setting": "ブログ設定",
      "change_password": "パスワード変更",
      "create_unregisted_anpi": "未登録者安否作成",
      "index": "一覧表示",
      "invite": "招待する",
      "leave": "退会",
      "map": "地図表示",
      "profile": "プロフィール編集",
      "search": "検索",
      "search_condition": "検索条件を変更する",
      "slide": "スライド"
    },
    "login_by": {
      "facebook": "Facebook ID でログイン",
      "github": "GitHub アカウントでログイン",
      "google_oauth2": "Google アカウントでログイン",
      "twitter": "Twitter ID でログイン",
      "yahoojp": "Yahoo! JAPAN ID でログイン",
      "yahoojp_v2": "Yahoo! JAPAN ID（V2）でログイン"
    },
    "mail": {
      "subject": {
        "completed": "会員登録完了",
        "notify": "会員登録申請",
        "verification": "会員登録確認"
      }
    },
    "my_blog": "ブログ",
    "notice": {
      "accepted": "参加しました。",
      "posted_gpf": "Google Person Finder に登録しました。",
      "rejected": "辞退しました。"
    },
    "options": {
      "confirm_personal_data_state": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "facebook_oauth": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "form_auth": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "github_oauth": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "google_oauth2_oauth": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "group_member_state": {
        "admin": "管理者",
        "disabled": "無効",
        "inviting": "招待中",
        "rejected": "辞退",
        "user": "ユーザー"
      },
      "license_name": {
        "free": "誰でも利用可",
        "not_free": "許可が必要"
      },
      "member_joins_to_invited_group": {
        "auto": "自動",
        "manual": "手動"
      },
      "sex": {
        "female": "女性",
        "male": "男性"
      },
      "twitter_oauth": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "yahoojp_oauth": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "yahoojp_v2_oauth": {
        "disabled": "無効",
        "enabled": "有効"
      }
    },
    "photo": "フォト",
    "photo_spot": "フォトスポット",
    "units": {
      "person": "%{count} 人"
    },
    "view": {
      "blog": {
        "genres": "記事ジャンル"
      },
      "browser": "ブラウザ",
      "category": "カテゴリー",
      "change_password": "パスワードを変更します。",
      "contributor": "投稿者",
      "delete": "削除",
      "email": "メールアドレス",
      "invited_group": {
        "header": "招待されたグループがあります。",
        "operation": "参加 | 辞退"
      },
      "keyword": "キーワード",
      "leave": "退会しました。",
      "location": "地域",
      "mail_subscription": "メルマガ購読",
      "new_password": "新しいパスワード",
      "new_password_again": "新しいパスワード（入力確認）",
      "old_password": "現在のパスワード",
      "password": "パスワード",
      "platform": "プラットフォーム",
      "registered_person": "登録者",
      "retired_member": "退会済み",
      "select_page": "ページを選択"
    }
  },
  "modules": {
    "addons": {
      "ads/category": "カテゴリー",
      "ads/page_list": "リスト表示",
      "board/anpi_list": "リスト表示",
      "board/anpi_post_setting": "安否投稿設定",
      "board/file": "ファイル",
      "board/file_setting": "添付ファイル設定",
      "board/google_person_finder_setting": "Google Person Finder 設定",
      "board/list": "リスト表示",
      "board/map_point": "地図",
      "board/map_setting": "地図設定",
      "board/post_setting": "投稿設定",
      "board/public_scope": "公開範囲",
      "category/category": "カテゴリー",
      "category/setting": "カテゴリー",
      "chat/category": "カテゴリー",
      "chat/path": "フォルダー",
      "chat/text": "文章",
      "chorg/entity_log": "変更履歴",
      "ckan/reference": "参照（ハーベスト）",
      "ckan/server": "CKAN 新着",
      "ckan/status": "CKAN 件数",
      "cms/additional_info": "追加情報",
      "cms/archive_view_switcher": "アーカイブ用表示設定",
      "cms/body": "本文",
      "cms/body_layout_html": "HTML",
      "cms/body_part": "本文パーツ",
      "cms/captcha": "認証",
      "cms/child_list": "子リスト表示",
      "cms/column/layout": "レイアウト",
      "cms/column/select_like": "選択",
      "cms/column/text_like": "制約条件",
      "cms/crumb": "パンくず設定",
      "cms/default_release_plan": "公開予約の既定値",
      "cms/edit_lock": "排他制御",
      "cms/editor_setting": "エディタ設定",
      "cms/file": "ファイル",
      "cms/for_member_node": "会員向け設定",
      "cms/form/node": "定型フォーム",
      "cms/form/page": "定型フォーム",
      "cms/group_permission": "管理権限",
      "cms/high_contrast_mode": "ハイコントラストモード",
      "cms/html": "HTML",
      "cms/import/body": "本文",
      "cms/layout_html": "レイアウト",
      "cms/max_file_size_setting": "最大ファイルサイズ設定",
      "cms/meta": "メタ情報",
      "cms/monthly_nav": "アーカイブナビ（月次）",
      "cms/node_auto_post_setting": "SNS自動投稿設定",
      "cms/node_list": "リスト表示",
      "cms/node_setting": "フォルダー設定",
      "cms/opendata_ref/area": "オープンデータ/地域",
      "cms/opendata_ref/category": "オープンデータ/分野",
      "cms/opendata_ref/dataset": "オープンデータ/データセット",
      "cms/opendata_ref/dataset_group": "オープンデータ/データセットグループ",
      "cms/opendata_ref/license": "オープンデータ/ライセンス",
      "cms/opendata_ref/resource": "オープンデータ/リソース",
      "cms/opendata_ref/site": "オープンデータサイト",
      "cms/page_group_list": "リスト表示",
      "cms/page_list": "リスト表示",
      "cms/page_search": "検索条件",
      "cms/page_setting": "ページ設定",
      "cms/parent_crumb": "パンくず",
      "cms/readable_setting": "閲覧権限",
      "cms/related_page": "関連記事",
      "cms/release": "公開設定",
      "cms/release_plan": "公開予約",
      "cms/role": "ロール",
      "cms/sns_poster": "SNS自動投稿設定",
      "cms/sns_share": "SNS共有",
      "cms/source_cleaner": "ソースクリーニング",
      "cms/tabs": "タブ表示",
      "cms/tag": "タグ",
      "cms/tag_setting": "タグ設定",
      "cms/thumb": "サムネイル",
      "contact/group": "連絡先",
      "contact/page": "連絡先",
      "event/body": "イベント情報",
      "event/calendar_list": "リスト表示",
      "event/date": "イベント",
      "event/facility": "施設",
      "event/ical_import": "ical取り込み",
      "event/ical_link": "iCal情報",
      "event/page_list": "リスト表示",
      "ezine/body": "本文",
      "ezine/column_setting": "入力設定",
      "ezine/data": "登録情報",
      "ezine/deliver_plan": "配信予約",
      "ezine/reply": "確認メール",
      "ezine/sender_address": "送信者設定",
      "ezine/signature": "署名",
      "ezine/subscription": "購読",
      "ezine/subscription_constraint": "購読制約",
      "facility/additional_info": "追加情報",
      "facility/body": "施設情報",
      "facility/category": "施設の種類",
      "facility/category_setting": "施設の種類",
      "facility/focus_setting": "フォーカス設定",
      "facility/icon_setting": "アイコン設定",
      "facility/image_file": "施設写真",
      "facility/image_info": "写真情報",
      "facility/location": "施設地域",
      "facility/location_setting": "施設の地域",
      "facility/opendata_assoc": "オープンデータ連携",
      "facility/pointer_image": "ポインタ画像",
      "facility/search_result": "検索結果",
      "facility/search_setting": "施設検索",
      "facility/service": "施設の用途",
      "facility/service_setting": "施設の用途",
      "facility/table": "表設定",
      "faq/question": "質問",
      "faq/search": "FAQ記事検索",
      "garbage/additional_info": "追加情報",
      "garbage/body": "ゴミ品目",
      "garbage/category": "ゴミの分別区分",
      "garbage/category_setting": "ゴミの分別区分",
      "gravatar/gravatar": "Gravatar",
      "gws/attendance/group_setting": "出退勤",
      "gws/board/category": "カテゴリー",
      "gws/board/group_setting": "掲示板",
      "gws/board/notify_setting": "通知",
      "gws/circular/category": "カテゴリー",
      "gws/circular/group_setting": "回覧板",
      "gws/column/select_like": "選択",
      "gws/column/text_like": "制約条件",
      "gws/contributor": "投稿者",
      "gws/custom_field": "入力項目",
      "gws/discussion/group_setting": "電子会議室",
      "gws/discussion/quota": "容量制限",
      "gws/discussion/release": "公開設定",
      "gws/discussion/todo": "電子会議室",
      "gws/edit_lock": "排他制御",
      "gws/elasticsearch/group_setting": "全文検索",
      "gws/facility/column_setting": "追加入力",
      "gws/facility/group_setting": "設備管理",
      "gws/facility/reservable_setting": "予約権限",
      "gws/faq/category": "カテゴリー",
      "gws/faq/group_setting": "よくある質問",
      "gws/file": "ファイル",
      "gws/group_permission": "管理権限",
      "gws/history": "変更履歴",
      "gws/link": "リンク",
      "gws/member": "参加者",
      "gws/memo/body": "内容",
      "gws/memo/group_setting": "メッセージ",
      "gws/memo/member": "宛先",
      "gws/memo/message_sort": "メッセージ並び順",
      "gws/memo/notify_setting": "通知",
      "gws/memo/priority": "重要度",
      "gws/monitor/category": "カテゴリー",
      "gws/monitor/contributor": "投稿者",
      "gws/monitor/group": "参加グループ",
      "gws/monitor/group_setting": "照会・回答",
      "gws/monitor/release": "公開設定",
      "gws/notice/category": "カテゴリー",
      "gws/notice/comment_post": "コメント",
      "gws/notice/comment_setting": "コメント設定",
      "gws/notice/member": "閲覧者",
      "gws/notice/resource_limitation": "容量制限",
      "gws/portal/portlet/ad": "広告",
      "gws/portal/portlet/ad_file": "広告画像",
      "gws/portal/portlet/attendance": "出退勤設定",
      "gws/portal/portlet/board": "掲示板設定",
      "gws/portal/portlet/bookmark": "お気に入り設定",
      "gws/portal/portlet/circular": "回覧板設定",
      "gws/portal/portlet/faq": "よくある質問設定",
      "gws/portal/portlet/free": "自由形式",
      "gws/portal/portlet/link": "リンク設定",
      "gws/portal/portlet/monitor": "照会・回答設定",
      "gws/portal/portlet/notice": "お知らせ設定",
      "gws/portal/portlet/presence": "在席管理設定",
      "gws/portal/portlet/qna": "Ｑ＆Ａ設定",
      "gws/portal/portlet/reminder": "リマインダー設定",
      "gws/portal/portlet/report": "レポート設定",
      "gws/portal/portlet/schedule": "スケジュール設定",
      "gws/portal/portlet/share": "共有ファイル設定",
      "gws/portal/portlet/survey": "アンケート",
      "gws/portal/portlet/todo": "ToDo設定",
      "gws/portal/portlet/workflow": "ワークフロー設定",
      "gws/presence/delegator_setting": "在席管理",
      "gws/qna/category": "カテゴリー",
      "gws/qna/group_setting": "Ｑ＆Ａ",
      "gws/readable_setting": "閲覧権限",
      "gws/release": "公開設定",
      "gws/reminder": "リマインダー設定",
      "gws/report/category": "カテゴリー",
      "gws/report/column_setting": "入力設定",
      "gws/report/custom_form": "入力内容",
      "gws/role": "権限/ロール",
      "gws/schedule/approval": "承認",
      "gws/schedule/attendance": "出欠確認",
      "gws/schedule/comments": "コメント",
      "gws/schedule/facility": "設備予約",
      "gws/schedule/facility_column_values": "設備追加情報",
      "gws/schedule/group_setting": "スケジュール",
      "gws/schedule/repeat": "繰り返し",
      "gws/schedule/reports": "レポート",
      "gws/schedule/todo": "ToDo",
      "gws/schedule/todo/category": "プロジェクト・工程",
      "gws/schedule/todo/comment_post": "コメント",
      "gws/schedule/todo/member": "担当者",
      "gws/schedules": "スケジュール",
      "gws/share/category": "カテゴリー",
      "gws/share/group_setting": "共有ファイル",
      "gws/share/history": "変更履歴",
      "gws/share/resource_limitation": "容量制限",
      "gws/staff_record/group_setting": "電子職員録",
      "gws/subscription_setting": "購読",
      "gws/survey/category": "カテゴリー",
      "gws/survey/column_setting": "入力設定",
      "gws/survey/custom_form": "アンケート",
      "gws/survey/files_ref": "回答一覧",
      "gws/survey/group_setting": "アンケート",
      "gws/system/desktop_setting": "デスクトップアプリ設定",
      "gws/system/file_setting": "ファイル設定",
      "gws/system/group_setting": "システム設定",
      "gws/system/log_setting": "ログ設定",
      "gws/system/menu_setting": "メニュー設定",
      "gws/system/notice_setting": "通知設定",
      "gws/user/custom_form": "拡張情報",
      "gws/user/public_duty": "事務分掌",
      "gws/workflow/approver_print": "承認",
      "gws/workflow/column_setting": "入力設定",
      "gws/workflow/custom_form": "入力内容",
      "history/backup": "更新履歴",
      "inquiry/aggregation": "集計",
      "inquiry/answer/body": "回答",
      "inquiry/captcha": "認証",
      "inquiry/faq": "FAQ",
      "inquiry/feedback_setting": "フィードバック設定",
      "inquiry/input_setting": "入力設定",
      "inquiry/message": "メッセージ",
      "inquiry/notice": "メール通知",
      "inquiry/reception_plan": "回答受付期間",
      "inquiry/release_plan": "公開期間",
      "inquiry/reply": "自動返信メール",
      "jmaxml/action/publish_page": "記事作成",
      "jmaxml/action/publishing_office": "発表気象台",
      "jmaxml/action/recipient": "受信者設定",
      "jmaxml/action/sender": "送信者設定",
      "jmaxml/action/switch_urgency": "緊急災害レイアウト切替",
      "jmaxml/filter": "フィルター",
      "jmaxml/trigger/ash_fall_forecast": "降灰予報",
      "jmaxml/trigger/flood_forecast": "指定河川洪水予報",
      "jmaxml/trigger/landslide_info": "土砂災害警戒情報",
      "jmaxml/trigger/quake": "地震",
      "jmaxml/trigger/tornado_alert": "竜巻注意情報",
      "jmaxml/trigger/tsunami": "津波",
      "jmaxml/trigger/volcano_flash": "噴火速報",
      "jmaxml/trigger/weather_alert": "気象特別警報・警報",
      "key_visual/page_list": "リスト表示",
      "ldap/group": "LDAP",
      "ldap/user": "LDAP",
      "mail_page/arrival_plan": "緊急情報表示",
      "mail_page/mail_setting": "メール取込設定",
      "map/page": "地図",
      "member/additional_attributes": "追加情報",
      "member/blog/blog_setting": "ブログ設定",
      "member/blog/body": "本文",
      "member/blog/genre": "ジャンル",
      "member/blog/location": "地域",
      "member/blog/page_setting": "ブログ設定",
      "member/editor_setting": "エディタ設定",
      "member/facebook_oauth": "Facebook OAuth 認証",
      "member/file": "ファイル",
      "member/form_auth": "フォーム認証",
      "member/github_oauth": "GitHub OAuth 認証",
      "member/google_oauth": "Google OAuth 認証",
      "member/group_invitation_setting": "グループ招待メール設定",
      "member/login_link": "ログイン",
      "member/member_invitation_setting": "会員招待メール",
      "member/photo/body": "フォト",
      "member/photo/category": "カテゴリ",
      "member/photo/license": "ライセンス",
      "member/photo/license_setting": "ライセンス",
      "member/photo/location": "地域",
      "member/photo/map": "地図",
      "member/photo/photo": "フォトライブラリ",
      "member/photo/slide": "フォトスライド",
      "member/photo/spot": "フォト",
      "member/redirection": "リダイレクト",
      "member/registration/completed": "登録完了メール",
      "member/registration/confirmation": "登録確認",
      "member/registration/notice": "メール通知",
      "member/registration/reply": "登録確認メール",
      "member/registration/required_fields": "必須入力",
      "member/registration/reset_password": "パスワード再設定メール",
      "member/registration/sender_address": "送信者設定",
      "member/twitter_oauth": "Twitter OAuth 認証",
      "member/yahoo_jp_oauth": "Yahoo! OAuth 認証",
      "member/yahoo_jp_oauth_v2": "Yahoo! OAuth V2 認証",
      "opendata/app": "アプリ",
      "opendata/app_page_setting": "アプリ詳細ページ設定",
      "opendata/appfile": "アプリファイル",
      "opendata/area": "地域",
      "opendata/category": "分野",
      "opendata/category_setting": "分野設定",
      "opendata/cms_ref/attachment_file": "添付ファイル連携",
      "opendata/cms_ref/page": "ページ連携",
      "opendata/comment": "コメント",
      "opendata/counter_html": "レイアウト",
      "opendata/dataset": "データセット",
      "opendata/dataset_group": "データセットグループ",
      "opendata/dataset_node": "データセット",
      "opendata/dataset_page_setting": "データセット詳細ページ設定",
      "opendata/estat_category": "eStat分野",
      "opendata/estat_category_setting": "eStat分野設定",
      "opendata/harvest/edit_lock": "ハーベスト",
      "opendata/harvest/importer_area_setting": "地域設定",
      "opendata/harvest/importer_category_setting": "分野設定",
      "opendata/harvest/importer_estat_category_setting": "eStat分野設定",
      "opendata/harvest/importer_report": "レポート",
      "opendata/harvest/license": "ハーベスト設定",
      "opendata/idea": "アイデア",
      "opendata/idea_node": "アイデア",
      "opendata/idea_page_setting": "アイデア詳細ページ設定",
      "opendata/list_node_setting": "フォルダー設定",
      "opendata/node_area": "都道府県 市区町村",
      "opendata/pref_code": "地域コード",
      "opendata/rdf_store": "RDFストア",
      "opendata/release": "公開設定",
      "opendata/resource": "リソース",
      "opendata/site_setting": "オープンデータ設定",
      "opendata/update_plan": "更新頻度",
      "opendata/url_rdf_store": "RDFストア",
      "opendata/url_resource": "クローリング",
      "opendata/workflow/idea_comment_approver": "承認",
      "recommend/content_list": "リスト表示",
      "rss/anpi_mail_setting": "安否確認メール設定",
      "rss/import": "RSS取込",
      "rss/page/body": "RSS情報",
      "rss/page/weather_xml": "気象庁防災情報XML",
      "rss/pub_sub_hubbub": "PubSubHubbub",
      "service/quota": "使用容量",
      "sitemap/body": "サイトマップ",
      "ss/approve_setting": "承認設定",
      "ss/body": "本文",
      "ss/editor_setting": "エディタ設定",
      "ss/elasticsearch/site_setting": "サイト内検索設定",
      "ss/facebook_setting": "Facebook設定",
      "ss/file_setting": "ファイル設定",
      "ss/kana_setting": "かな設定",
      "ss/link_file": "ファイル",
      "ss/mail_setting": "メール設定",
      "ss/map_setting": "地図設定",
      "ss/markdown": "内容",
      "ss/mobile_setting": "モバイル設定",
      "ss/notification/reply": {
        "discussion": "電子会議室"
      },
      "ss/site_auto_post_setting": "SNS自動投稿設定",
      "ss/trash_setting": "ゴミ箱設定",
      "ss/twitter_setting": "Twitter設定",
      "ss/user_group_history": "異動履歴",
      "sys/body": "お知らせ本文",
      "sys/environment_setting": "環境変数設定",
      "sys/open_id_connect_setting": "OpenId Connect設定",
      "sys/role": "ロール",
      "sys/saml_setting": "SAML設定",
      "urgency/layout": "緊急災害レイアウト設定",
      "urgency/mail_page": "緊急災害レイアウト設定",
      "webmail/apply_filter": "フィルター適用",
      "webmail/group_extension": "代表メール",
      "webmail/history": "変更履歴",
      "webmail/mail_body": "内容",
      "webmail/mail_file": "添付ファイル",
      "webmail/role": "権限/ロール",
      "webmail/user_extension": "アカウント",
      "workflow/approver": "承認",
      "workflow/approver_view": "承認経路",
      "workflow/branch": "差し替えページ",
      "workflow/circulation_view": "回覧経路"
    },
    "ads": "広告管理",
    "article": "記事",
    "board": "掲示板",
    "category": "カテゴリー",
    "chat": "チャット",
    "chorg": "組織変更",
    "ckan": "CKAN",
    "cms": "標準機能",
    "contact": "連絡先",
    "event": "イベント",
    "ezine": "メールマガジン",
    "facility": "施設",
    "faq": "FAQ",
    "garbage": "ゴミDB",
    "gws": "標準機能",
    "gws/attendance": "出退勤",
    "gws/attendance/management/time_card": "管理",
    "gws/attendance/time_card": "タイムカード",
    "gws/board": "掲示板",
    "gws/bookmark": "お気に入り",
    "gws/chorg": "組織変更",
    "gws/circular": "回覧板",
    "gws/discussion": "電子会議室",
    "gws/elasticsearch": "全文検索",
    "gws/facility": "設備管理",
    "gws/faq": "よくある質問",
    "gws/job": "ジョブ",
    "gws/memo": "メッセージ",
    "gws/memo/message": "メッセージ",
    "gws/memo/notice_mail": "メール通知",
    "gws/monitor": "照会・回答",
    "gws/notice": "お知らせ",
    "gws/personal_address": "個人アドレス帳",
    "gws/portal": "ポータル",
    "gws/presence": "在席管理",
    "gws/presence/management/users": "管理",
    "gws/presence/users": "在席状況",
    "gws/qna": "Ｑ＆Ａ",
    "gws/reminder": "リマインダー",
    "gws/report": "レポート",
    "gws/schedule": "スケジュール",
    "gws/schedule/todo": "ToDo",
    "gws/share": "共有ファイル",
    "gws/shared_address": "共有アドレス帳",
    "gws/staff_record": "電子職員録・事務分掌表",
    "gws/survey": "アンケート",
    "gws/todo": "ToDo",
    "gws/workflow": "ワークフロー",
    "history": "履歴",
    "import_page": "取り込みページ",
    "inquiry": "メールフォーム",
    "jmaxml": "気象庁防災情報XML",
    "job": "ジョブ",
    "kana": "かな",
    "key_visual": "キービジュアル",
    "ldap": "LDAP",
    "mail_page": "メール取込",
    "map": "地図",
    "member": "メンバー",
    "opendata": "オープンデータ",
    "rdf": "RDF語彙",
    "recommend": "レコメンド",
    "rss": "RSS取込",
    "service": "サービス設定",
    "sitemap": "サイトマップ",
    "sns": "SNS",
    "sns/notification": "通知",
    "sys": "システム",
    "uploader": "アップローダー",
    "urgency": "緊急災害レイアウト",
    "voice": "読み上げ",
    "webmail": "ウェブメール",
    "webmail/group_imap": "グループ代表メール",
    "workflow": "ワークフロー"
  },
  "mongoid": {
    "attributes": {
      "ads/access_log": {
        "count": "アクセス数",
        "date": "アクセス日",
        "link_url": "リンクURL"
      },
      "ads/addon/category": {
        "ads_categories": "カテゴリー"
      },
      "ads/addon/page_list": {
        "link_action": "リンク動作",
        "link_target": "リンク表示",
        "lower_html": "下部HTML",
        "upper_html": "上部HTML",
        "with_category": "カテゴリー連動"
      },
      "ads/banner": {
        "additional_attr": "追加属性",
        "file_id": "バナー画像",
        "link_url": "リンクURL",
        "name": "サイト名"
      },
      "board/addon/anpi_list": {
        "show_email": "メールアドレスの表示"
      },
      "board/addon/anpi_post_setting": {
        "deny_ips": "拒否IPアドレス",
        "show_email": "メールアドレスの公開",
        "text_size_limit": "本文の最大文字数"
      },
      "board/addon/file_setting": {
        "file_ext_limit": "ファイル拡張子",
        "file_limit": "添付ファイル",
        "file_scan": "ウイルスチェック",
        "file_size_limit": "容量制限"
      },
      "board/addon/google_person_finder_setting": {
        "gpf_api_key": "APIキー",
        "gpf_domain_name": "ドメイン名",
        "gpf_mode": "モード",
        "gpf_repository": "リポジトリ",
        "gpf_state": "状態"
      },
      "board/addon/list": {
        "mode": "表示形式"
      },
      "board/addon/map_point": {
        "point": "位置"
      },
      "board/addon/map_setting": {
        "map_center": "中心座標",
        "map_state": "状態",
        "map_view_state": "地図表示状態",
        "map_zoom_level": "縮尺レベル"
      },
      "board/addon/post_setting": {
        "banned_words": "禁止語句設定",
        "deletable_post": "パスワードによる削除",
        "deny_ips": "拒否IPアドレス",
        "deny_url": "URl投稿拒否",
        "show_email": "メールアドレスの表示",
        "show_url": "URLの表示",
        "text_size_limit": "本文の最大文字数"
      },
      "board/addon/public_scope": {
        "public_scope": "公開範囲"
      },
      "board/model/anpi_post": {
        "addr": "住所",
        "age": "年齢",
        "email": "メールアドレス",
        "kana": "名前（かな）",
        "member_id": "登録者",
        "name": "名前",
        "sex": "性別",
        "tel": "電話番号",
        "text": "安否情報"
      },
      "board/post": {
        "delete_key": "削除キー",
        "email": "メールアドレス",
        "in_files": "ファイル",
        "name": "タイトル",
        "poster": "投稿者",
        "poster_name": "お名前",
        "poster_url": "URL",
        "text": "本文"
      },
      "category/addon/integration": {
        "integration_master_node": "統合元フォルダー",
        "integration_partial_node": "対象フォルダー",
        "partial_node": "フォルダー"
      },
      "category/addon/split": {
        "split_master_node": "分割元フォルダー",
        "split_partial_node": "新規フォルダー"
      },
      "chat/addon/category": {
        "category_ids": "カテゴリー"
      },
      "chat/addon/path": {
        "chat_path": "フォルダーパス"
      },
      "chat/addon/text": {
        "chat_category_ids": "シナリオカテゴリー",
        "chat_retry": "フィードバック返答(いいえ)",
        "chat_success": "フィードバック返答(はい)",
        "exception_text": "例外文章",
        "first_suggest": "開始時サジェスト",
        "first_text": "開始時文章",
        "intent_ids": "シナリオ",
        "question": "フィードバック",
        "response_template": "返答テンプレート"
      },
      "chat/category": {
        "name": "名前",
        "node_id": "フォルダー",
        "order": "並び順"
      },
      "chat/history": {
        "click_suggest": "使用したサジェスト",
        "intent_id": "シナリオ",
        "node_id": "フォルダー",
        "prev_intent_id": "前回のシナリオ",
        "question": "フィードバック",
        "request_id": "リクエストID",
        "result": "返答",
        "session_id": "セッションID",
        "suggest": "サジェスト",
        "text": "文章"
      },
      "chat/intent": {
        "error": "エラー",
        "name": "名前",
        "node_id": "フォルダー",
        "order": "並び順",
        "phrase": "フレーズ",
        "question": "フィードバック",
        "response": "返答",
        "site_search": "サイト内検索のリンク",
        "suggest": "サジェスト"
      },
      "chorg/model/changeset": {
        "destinations": "移動先",
        "sources": "移動元",
        "type": "種別"
      },
      "chorg/model/revision": {
        "delete_method": "削除方法",
        "job_ids": "ジョブ",
        "name": "名前",
        "revision_csv_file_id": "組織変更操作CSV",
        "user_csv_file_id": "ユーザーCSVファイル"
      },
      "chorg/revision": {
        "content_csv_file_id": "コンテンツCSVファイル"
      },
      "chorg/run_params": {
        "add_newly_created_group_to_site": "新規作成グループをサイトに追加",
        "reservation": "予約実行"
      },
      "ckan/node/page": {
        "ckan_basicauth_password": "Basic認証パスワード",
        "ckan_basicauth_state": "Basic認証",
        "ckan_basicauth_username": "Basic認証ユーザー名",
        "ckan_item_url": "リンクのURL共通部分",
        "ckan_max_docs": "最大件数",
        "ckan_url": "URL"
      },
      "ckan/part/reference": {
        "exporter_id": "エクスポート",
        "link_name": "リンク名"
      },
      "ckan/part/status": {
        "ckan_basicauth_password": "Basic認証パスワード",
        "ckan_basicauth_state": "Basic認証",
        "ckan_basicauth_username": "Basic認証ユーザー名",
        "ckan_status": "種類",
        "ckan_url": "URL",
        "ckan_value_url": "件数部分のリンクURL"
      },
      "cms/addon/additional_info": {
        "add_info": "項目を追加する",
        "del_info": "削除",
        "field": "項目",
        "value": "内容"
      },
      "cms/addon/archive_view_switcher": {
        "archive_view": "表示設定"
      },
      "cms/addon/captcha": {
        "captcha": "画像認証"
      },
      "cms/addon/check_links": {
        "check_links_errors": "検出されたリンク切れ",
        "check_links_errors_remark": "※集計時のタイミングやサーバー負荷状況によっては誤検出の場合がございます。",
        "check_links_errors_updated": "検出日時",
        "check_links_errors_url": "URL"
      },
      "cms/addon/child_list": {
        "child_limit": "表示件数",
        "child_loop_html": "ループHTML",
        "child_lower_html": "下部HTML",
        "child_upper_html": "上部HTML"
      },
      "cms/addon/column/layout": {
        "layout": "レイアウト"
      },
      "cms/addon/column/select_like": {
        "select_options": "選択肢"
      },
      "cms/addon/column/text_like": {
        "additional_attr": "追加属性",
        "max_length": "最大長",
        "place_holder": "プレースホルダー"
      },
      "cms/addon/crumb": {
        "home_label": "ホームラベル"
      },
      "cms/addon/default_release_plan": {
        "close_days_before": "公開終了間近の表示日",
        "default_close_days_after": "公開終了日",
        "default_release_days_after": "公開開始日",
        "default_release_plan_state": "公開予約の既定値"
      },
      "cms/addon/edit_lock": {
        "lock_owner": "所有者",
        "lock_until": "期限"
      },
      "cms/addon/editor_setting": {
        "color_button": "文字色変更ボタン",
        "editor_css_path": "スタイルシートパス",
        "syntax_check": "アクセシビリティチェック"
      },
      "cms/addon/for_member_node": {
        "for_member_state": "会員向け"
      },
      "cms/addon/form/node": {
        "st_form_ids": "定型フォーム設定"
      },
      "cms/addon/form/page": {
        "form_id": "定型フォーム"
      },
      "cms/addon/group_permission": {
        "group_ids": "管理グループ",
        "groups": "管理グループ",
        "permission_level": "権限レベル"
      },
      "cms/addon/high_contrast_mode": {
        "background_color": "背景色",
        "font_color": "文字色",
        "high_contrast_mode": "設定"
      },
      "cms/addon/import/group": {
        "in_file": "ファイル"
      },
      "cms/addon/import/page": {
        "in_file": "ファイル"
      },
      "cms/addon/import/user": {
        "in_file": "ファイル"
      },
      "cms/addon/layout_html": {
        "html": "HTML"
      },
      "cms/addon/list/model": {
        "conditions": "検索条件(URL)",
        "loop_format": "ループHTML形式",
        "loop_html": "ループHTML",
        "loop_liquid": "ループHTML",
        "lower_html": "下部HTML",
        "new_days": "NEWマーク期間",
        "no_items_display_state": "ページ未検出時表示",
        "substitute_html": "代替HTML",
        "upper_html": "上部HTML"
      },
      "cms/addon/meta": {
        "description": "概要",
        "keywords": "キーワード",
        "summary_html": "サマリー"
      },
      "cms/addon/monthly_nav": {
        "periods": "表示期間"
      },
      "cms/addon/node_auto_post_setting": {
        "node_auto_post_setting": "SNS自動投稿設定",
        "node_edit_auto_post": "編集時に自動投稿",
        "node_sns_auto_delete": "非公開時に投稿を削除",
        "node_twitter_auto_post": "Twitter自動投稿"
      },
      "cms/addon/opendata_ref/area": {
        "opendata_area_ids": "地域"
      },
      "cms/addon/opendata_ref/category": {
        "opendata_category_ids": "カテゴリー"
      },
      "cms/addon/opendata_ref/dataset": {
        "opendata_dataset_ids": "データセット",
        "opendata_dataset_state": "公開状態"
      },
      "cms/addon/opendata_ref/dataset_group": {
        "opendata_dataset_group_ids": "データセットグループ"
      },
      "cms/addon/opendata_ref/license": {
        "opendata_license_ids": "ライセンス"
      },
      "cms/addon/opendata_ref/resource": {
        "opendata_dataset_ids": "データセット",
        "opendata_resource_license_ids": "ライセンス",
        "opendata_resource_state": "公開状態",
        "opendata_resource_text": "説明"
      },
      "cms/addon/opendata_ref/site": {
        "opendata_site_ids": "サイト"
      },
      "cms/addon/page_group_list": {
        "condition_groups": "検索条件(グループ)"
      },
      "cms/addon/page_search": {
        "search_approved": "承認日時",
        "search_approved_close": "承認日時（終了）",
        "search_approved_start": "承認日時（開始）",
        "search_approver_state": "承認ステータス",
        "search_categories": "カテゴリー",
        "search_category_ids": "カテゴリー",
        "search_filename": "ファイル名",
        "search_first_released": "公開ステータス",
        "search_group_ids": "グループ",
        "search_groups": "グループ",
        "search_keyword": "キーワード",
        "search_name": "タイトル",
        "search_node_ids": "フォルダー",
        "search_nodes": "フォルダー",
        "search_released": "公開日時",
        "search_released_close": "公開日時（終了）",
        "search_released_start": "公開日時（開始）",
        "search_routes": "ページ属性",
        "search_sort": "検索結果の並び順",
        "search_state": "ステータス",
        "search_updated": "更新日時",
        "search_updated_close": "更新日時（終了）",
        "search_updated_start": "更新日時（開始）",
        "search_user_ids": "作成者",
        "search_users": "作成者"
      },
      "cms/addon/parent_crumb": {
        "parent_crumb": "パンくず",
        "parent_crumb_urls": "親フォルダー"
      },
      "cms/addon/permission": {
        "group_ids": "管理グループ",
        "groups": "管理グループ",
        "permission_level": "権限レベル"
      },
      "cms/addon/readable_setting": {
        "readable_group_ids": "閲覧グループ",
        "readable_groups_hash": "閲覧グループ(ハッシュ)",
        "readable_member_ids": "閲覧ユーザー",
        "readable_members_hash": "閲覧ユーザー(ハッシュ)",
        "readable_setting_range": "公開範囲"
      },
      "cms/addon/related_page": {
        "related_page_ids": "関連記事",
        "related_page_sort": "並び順",
        "related_pages": "関連記事"
      },
      "cms/addon/release": {
        "released": "公開日時"
      },
      "cms/addon/release_plan": {
        "close_date": "公開終了日時(予約)",
        "release_date": "公開開始日時(予約)"
      },
      "cms/addon/role": {
        "cms_role_ids": "ロール"
      },
      "cms/addon/sns_poster": {
        "edit_auto_post": "編集時に自動投稿",
        "sns_auto_delete": "非公開時に投稿を削除",
        "sns_poster": "SNS自動投稿設定",
        "twitter_auto_post": "Twitter自動投稿",
        "twitter_post_error": "投稿エラー"
      },
      "cms/addon/sns_share": {
        "sns_share_orders": "並び順",
        "sns_share_states": "表示"
      },
      "cms/addon/source_cleaner": {
        "action": "操作",
        "replaced_value": "置換後の値",
        "target": "対象"
      },
      "cms/addon/tabs": {
        "conditions": "タブ設定(URL)",
        "new_days": "NEWマーク期間"
      },
      "cms/addon/tag": {
        "tags": "タグ"
      },
      "cms/addon/tag_setting": {
        "st_tags": "タグ"
      },
      "cms/addon/thumb": {
        "thumb_id": "サムネイル画像"
      },
      "cms/body_layout": {
        "name": "本文レイアウト名",
        "parts": "パーツ名"
      },
      "cms/column/base": {
        "name": "名前",
        "order": "並び順",
        "required": "必須入力",
        "route": "属性",
        "tooltips": "ツールチップ"
      },
      "cms/column/date_field": {
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ",
        "place_holder": "プレースホルダー"
      },
      "cms/column/file_upload": {
        "file_type": "ファイルタイプ",
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ",
        "image_text": "代替えテキスト",
        "label_max_length": "リンクテキスト最大長",
        "label_place_holder": "リンクテキストプレースホルダー",
        "max_length": "最大長",
        "place_holder": "プレースホルダー"
      },
      "cms/column/list": {
        "list_type": "種類"
      },
      "cms/column/select": {
        "place_holder": "プレースホルダー"
      },
      "cms/column/text_field": {
        "input_type": "種類"
      },
      "cms/column/url_field": {
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ"
      },
      "cms/column/url_field2": {
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ",
        "label_max_length": "リンクテキスト最大長",
        "label_place_holder": "リンクテキストプレースホルダー",
        "link_label": "リンクテキスト",
        "link_max_length": "リンクURL最大長",
        "link_place_holder": "リンクURLプレースホルダー",
        "link_url": "リンクURL",
        "max_length": "最大長",
        "place_holder": "プレースホルダー"
      },
      "cms/column/value/base": {
        "alignment": "配置",
        "order": "並び順"
      },
      "cms/column/value/check_box": {
        "values": "選択肢"
      },
      "cms/column/value/date_field": {
        "date": "日付",
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ"
      },
      "cms/column/value/file_upload": {
        "file_id": "ファイル",
        "file_label": "リンクテキスト・代替テキスト",
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ",
        "image_html_type": "貼付方法",
        "link_url": "URL",
        "text": "動画の内容説明"
      },
      "cms/column/value/free": {
        "value": "テキスト"
      },
      "cms/column/value/headline": {
        "head": "見出し",
        "text": "テキスト"
      },
      "cms/column/value/list": {
        "order": "順番",
        "text": "テキスト"
      },
      "cms/column/value/radio_button": {
        "value": "選択肢"
      },
      "cms/column/value/select": {
        "value": "選択肢"
      },
      "cms/column/value/table": {
        "value": "表"
      },
      "cms/column/value/text_area": {
        "value": "文"
      },
      "cms/column/value/text_field": {
        "value": "文字列"
      },
      "cms/column/value/url_field": {
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ",
        "value": "URL"
      },
      "cms/column/value/url_field2": {
        "html_additional_attr": "HTML追加属性",
        "html_tag": "HTMLタグ",
        "link_item_id": "リンク先アイテムID",
        "link_item_type": "リンク先アイテム型",
        "link_label": "リンクテキスト",
        "link_target": "リンクターゲット",
        "link_url": "リンクURL"
      },
      "cms/column/value/youtube": {
        "auto_width": "画面幅に合わせる",
        "height": "高さ",
        "url": "URL",
        "width": "幅"
      },
      "cms/command": {
        "command": "コマンド",
        "description": "説明",
        "name": "タイトル",
        "order": "並び順",
        "output": "出力",
        "path": "パス",
        "target": "対象"
      },
      "cms/content": {
        "depth": "フォルダ階層",
        "index_name": "一覧用タイトル",
        "keyword": "キーワード",
        "md5": "ハッシュ値",
        "name": "タイトル",
        "order": "並び順",
        "released": "公開日時",
        "user": "作成者"
      },
      "cms/copy_nodes_task": {
        "target_node_name": "複製先フォルダー名"
      },
      "cms/editor_template": {
        "description": "説明",
        "name": "名前",
        "order": "並び順"
      },
      "cms/form": {
        "column_ids": "入力項目",
        "init_column_ids": "初期ブロック",
        "name": "名前",
        "order": "並び順",
        "sub_type": "目的"
      },
      "cms/import_job_file": {
        "basename": "フォルダー名",
        "import_date": "インポート開始日時",
        "in_file": "ファイル",
        "name": "タイトル"
      },
      "cms/init_column": {
        "name": "名前",
        "order": "並び順"
      },
      "cms/layout": {
        "name": "レイアウト名"
      },
      "cms/loop_setting": {
        "description": "説明",
        "name": "タイトル",
        "order": "並び順"
      },
      "cms/model/member": {
        "email": "メールアドレス",
        "email_again": "メールアドレス（確認用）",
        "in_password": "パスワード",
        "in_password_again": "パスワード（確認用）",
        "name": "氏名",
        "oauth_id": "OAuth ID",
        "oauth_token": "OAuth トークン",
        "oauth_type": "OAuth Type",
        "password": "パスワード"
      },
      "cms/model/node": {
        "basename": "フォルダー名",
        "filename": "フォルダー名",
        "in_file": "ファイル",
        "route": "フォルダー属性",
        "summary_html": "Summary",
        "view_route": "既定のモジュール"
      },
      "cms/model/page": {
        "answer": "回答",
        "body_part": "本文パーツ",
        "categories": "カテゴリー",
        "category_ids": "カテゴリー",
        "contact": "お問い合わせ",
        "contact_charge": "担当",
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_group": "所属",
        "contact_group_id": "所属",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_state": "表示設定",
        "contact_tel": "電話番号",
        "content": "内容",
        "cost": "費用",
        "event_dates": "イベント日",
        "event_deadline": "申込締切",
        "event_keyword": "イベント検索ワード",
        "event_name": "イベントタイトル",
        "field": "項目名",
        "files": "ファイル",
        "html": "本文",
        "question": "質問",
        "related_url": "URL",
        "route": "ページ属性",
        "schedule": "日時",
        "st_categories": "カテゴリー",
        "st_category_ids": "カテゴリー",
        "summary_html": "Summary",
        "value": "内容",
        "venue": "開催場所"
      },
      "cms/model/part": {
        "ajax_view": "動的表示",
        "mobile_view": "携帯向け表示",
        "name": "パーツ名",
        "route": "パーツ属性"
      },
      "cms/notice": {
        "name": "タイトル",
        "notice_severity": "種別",
        "notice_target": "公開範囲"
      },
      "cms/page": {
        "html": "本文"
      },
      "cms/page_search": {
        "name": "名前",
        "order": "並び順"
      },
      "cms/reference/layout": {
        "body_layout_id": "本文レイアウト",
        "layout": "レイアウト",
        "layout_id": "レイアウト"
      },
      "cms/reference/page_layout": {
        "page_layout_id": "ページレイアウト"
      },
      "cms/site": {
        "auto_description": "概要自動設定",
        "auto_keywords": "キーワード自動設定",
        "keywords": "追加キーワード",
        "max_name_length": "ページタイトル文字数制限"
      },
      "cms/source_cleaner_template": {
        "name": "名前",
        "order": "並び順"
      },
      "cms/task": {
        "node_id": "フォルダー"
      },
      "cms/theme_template": {
        "class_name": "class属性",
        "css_path": "cssパス",
        "name": "名前",
        "order": "並び順"
      },
      "cms/word_dictionary": {
        "body": "設定",
        "name": "名前"
      },
      "contact/addon/group": {
        "contact_charge": "担当",
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_group": "所属",
        "contact_group_id": "所属",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_state": "表示設定",
        "contact_tel": "電話番号"
      },
      "contact/addon/page": {
        "contact_charge": "担当",
        "contact_email": "メールアドレス",
        "contact_fax": "ファックス番号",
        "contact_group": "所属",
        "contact_group_id": "所属",
        "contact_link_name": "リンク名",
        "contact_link_url": "リンクURL",
        "contact_state": "表示設定",
        "contact_tel": "電話番号"
      },
      "event/addon/calendar_list": {
        "event_display": "表示形式"
      },
      "event/addon/facility": {
        "facilities": "施設",
        "facility_ids": "施設"
      },
      "event/addon/ical_import": {
        "ical_basic_certs": "ベーシック認証",
        "ical_basic_password": "ベーシック認証パスワード",
        "ical_basic_user": "ベーシック認証ユーザー",
        "ical_category_ids": "ページカテゴリー",
        "ical_import_date_after": "取り込み制限(未来)",
        "ical_import_date_ago": "取り込み制限(過去)",
        "ical_import_url": "iCal配信URL",
        "ical_max_docs": "最大保存件数",
        "ical_page_state": "ページステータス",
        "ical_refresh_method": "更新方法",
        "ical_sync_method": "同期方法"
      },
      "event/addon/ical_link": {
        "ical_link": "ソースURL",
        "ical_uid": "ソースID"
      },
      "ezine/addon/body": {
        "html": "本文（HTML版）",
        "text": "本文（テキスト版）"
      },
      "ezine/addon/deliver_plan": {
        "deliver_date": "配信予約日時"
      },
      "ezine/addon/reply": {
        "reply_lower_text": "下部確認テキスト",
        "reply_signature": "署名",
        "reply_upper_text": "上部確認テキスト"
      },
      "ezine/addon/sender_address": {
        "sender_email": "送信メールアドレス",
        "sender_name": "送信者名"
      },
      "ezine/addon/signature": {
        "signature_html": "署名（HTML版）",
        "signature_text": "署名（テキスト版）"
      },
      "ezine/addon/subscription": {
        "subscription_ids": "購読メルマガ"
      },
      "ezine/addon/subscription_constraint": {
        "subscription_constraint": "制約"
      },
      "ezine/column": {
        "additional_attr": "追加属性",
        "html": "説明テキスト",
        "input_confirm": "入力確認",
        "input_type": "入力形式",
        "name": "項目名",
        "order": "並び順",
        "required": "必須入力",
        "select_options": "選択肢",
        "state": "ステータス"
      },
      "ezine/entry": {
        "email": "メールアドレス",
        "email_type": "配信形式",
        "entry_type": "登録種別"
      },
      "ezine/member": {
        "email": "メールアドレス",
        "email_type": "配信形式",
        "state": "配信状態"
      },
      "ezine/node/page": {
        "column_ids": "カラム"
      },
      "ezine/page": {
        "name": "記事タイトル",
        "results": "配信開始日時",
        "test_delivered": "テスト配信完了日時"
      },
      "ezine/sent_log": {
        "created": "配信日時",
        "email": "メールアドレス"
      },
      "ezine/test_member": {
        "email": "メールアドレス",
        "email_type": "配信形式"
      },
      "facility/addon/opendata_assoc": {
        "csv_assoc": "CSV連携",
        "opendata_site_ids": "オープンデータサイト"
      },
      "facility/addon/table": {
        "facility_caption": "キャプション"
      },
      "facility/image": {
        "image_alt": "ALT属性",
        "image_comment": "説明文",
        "image_thumb_height": "高さ",
        "image_thumb_size": "サムネイルサイズ",
        "image_thumb_width": "幅"
      },
      "facility/node/location": {
        "center_point": "中心座標",
        "zoom_level": "ズームレベル"
      },
      "facility/node/page": {
        "additional_info": "追加情報",
        "address": "住所",
        "categories": "施設の種類",
        "fax": "FAX",
        "field": "項目名",
        "groups": "管理グループ",
        "kana": "施設名ふりがな",
        "layout": "レイアウト",
        "locations": "施設の地域",
        "map_points": "座標",
        "name": "施設名",
        "postcode": "郵便番号",
        "related_url": "URL",
        "services": "施設の用途",
        "tel": "電話番号",
        "value": "内容"
      },
      "facility/node/search": {
        "map_html": "地図HTML",
        "search_html": "検索HTML"
      },
      "faq/addon/search": {
        "search_node_id": "検索フォルダー"
      },
      "garbage/node/page": {
        "category_ids": "カテゴリー",
        "field": "項目名",
        "name": "品目名",
        "remark": "出し方・ワンポイント"
      },
      "gravatar/addon/gravatar": {
        "gravatar_email": "Gravatar用メールアドレス",
        "gravatar_image_view_kind": "画像表示ステータス",
        "gravatar_image_view_kind_cms_user_email": "ページ作成者の画像を表示する",
        "gravatar_image_view_kind_disable": "表示しない",
        "gravatar_image_view_kind_special_email": "Gravatar用メールアドレス欄に記載した画像を表示する",
        "gravatar_screen_name": "投稿者表示名"
      },
      "gws/addon/attendance/group_setting": {
        "attendance_break_enter1_label": "休憩1開始ラベル",
        "attendance_break_enter2_label": "休憩2開始ラベル",
        "attendance_break_enter3_label": "休憩3開始ラベル",
        "attendance_break_leave1_label": "休憩1終了ラベル",
        "attendance_break_leave2_label": "休憩2終了ラベル",
        "attendance_break_leave3_label": "休憩3終了ラベル",
        "attendance_break_time1_state": "休憩1表示",
        "attendance_break_time2_state": "休憩2表示",
        "attendance_break_time3_state": "休憩3表示",
        "attendance_enter_label": "出勤表示",
        "attendance_leave_label": "退勤表示",
        "attendance_management_year": "管理年数",
        "attendance_time_changed_minute": "日替わり時刻",
        "attendance_year_changed_month": "年度替わり月"
      },
      "gws/addon/board/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/board/group_setting": {
        "board_browsed_delay": "既読にするまでの秒数",
        "board_file_size": "添付最大サイズ",
        "board_file_size_per_post": "添付最大サイズ/投稿単位",
        "board_file_size_per_topic": "添付最大サイズ/トピック単位",
        "board_files_break": "ファイル表示の並び",
        "board_links_break": "リンク表示の並び",
        "board_new_days": "新着表示期間"
      },
      "gws/addon/board/notify_setting": {
        "notify_state": "通知設定",
        "subscribed_users_readable_state": "通知先表示"
      },
      "gws/addon/circular/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/circular/group_setting": {
        "circular_default_due_date": "回覧期限日初期値",
        "circular_delete_threshold": "回覧復旧可能期間",
        "circular_files_break": "ファイル表示の並び",
        "circular_filesize_limit": "添付サイズ制限",
        "circular_max_member": "回覧人数制限"
      },
      "gws/addon/column/select_like": {
        "select_options": "選択肢"
      },
      "gws/addon/column/text_like": {
        "additional_attr": "追加属性",
        "max_length": "最大長"
      },
      "gws/addon/contributor": {
        "contributor_id": "投稿者（データID）",
        "contributor_model": "投稿者（モデル）",
        "contributor_name": "投稿者名"
      },
      "gws/addon/custom_field": {
        "additional_attr": "追加属性",
        "input_confirm": "入力確認",
        "input_type": "入力形式",
        "max_length": "最大文字数",
        "max_upload_file_size": "最大ファイルサイズ設定",
        "place_holder": "初期表示",
        "required": "必須入力",
        "resizing": "画像リサイズ",
        "resizing_height": "画像リサイズ（高さ）",
        "resizing_width": "画像リサイズ（幅）",
        "select_options": "選択肢",
        "tooltips": "ツールチップ",
        "upload_file_count": "アップロードファイル数"
      },
      "gws/addon/discussion/group_permission": {
        "custom_group_ids": "管理カスタムグループ",
        "custom_groups_hash": "管理カスタムグループ",
        "group_ids": "管理グループ",
        "groups_hash": "管理グループ",
        "permission_level": "権限レベル",
        "user_ids": "管理ユーザー",
        "users_hash": "管理ユーザー"
      },
      "gws/addon/discussion/group_setting": {
        "discussion_comment_limit": "コメントの上限",
        "discussion_filesize_limit": "添付サイズ制限",
        "discussion_new_days": "新着表示期間",
        "discussion_quota": "総容量制限",
        "discussion_recent_limit": "新着表示件数",
        "discussion_todo_limit": "ToDo表示件数",
        "discussion_unseen_interval": "新着確認の間隔"
      },
      "gws/addon/discussion/quota": {
        "size": "使用量"
      },
      "gws/addon/discussion/readable_setting": {
        "readable_custom_group_ids": "閲覧カスタムグループ",
        "readable_group_ids": "閲覧グループ",
        "readable_member_ids": "閲覧ユーザー"
      },
      "gws/addon/discussion/release": {
        "released": "公開日時"
      },
      "gws/addon/edit_lock": {
        "lock_owner": "所有者",
        "lock_owner_id": "ロック所有者",
        "lock_until": "ロック期限"
      },
      "gws/addon/elasticsearch/group_setting": {
        "elasticsearch_hosts": "全文検索サーバー",
        "elasticsearch_state": "全文検索"
      },
      "gws/addon/facility/column_setting": {
        "columns": "追加入力"
      },
      "gws/addon/facility/group_setting": {
        "facility_hours": "取得可能時間",
        "facility_max_hour": "取得可能時間（終了）",
        "facility_min_hour": "取得可能時間（開始）"
      },
      "gws/addon/facility/reservable_setting": {
        "reservable_group_ids": "予約可能グループ",
        "reservable_groups_hash": "予約可能グループ(ハッシュ)",
        "reservable_member_ids": "予約可能ユーザー",
        "reservable_members_hash": "予約可能ユーザー(ハッシュ)"
      },
      "gws/addon/faq/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/faq/group_setting": {
        "faq_browsed_delay": "既読にするまでの秒数",
        "faq_file_size": "添付最大サイズ",
        "faq_file_size_per_post": "添付最大サイズ/投稿単位",
        "faq_file_size_per_topic": "添付最大サイズ/トピック単位",
        "faq_files_break": "ファイル表示の並び",
        "faq_new_days": "新着表示期間"
      },
      "gws/addon/file": {
        "file_ids": "ファイル"
      },
      "gws/addon/import/facility/item": {
        "in_file": "ファイル"
      },
      "gws/addon/import/group": {
        "in_file": "ファイル"
      },
      "gws/addon/import/role": {
        "in_file": "ファイル"
      },
      "gws/addon/import/user": {
        "in_file": "ファイル"
      },
      "gws/addon/link": {
        "links": "リンク"
      },
      "gws/addon/link/feature": {
        "links/name": "表示名",
        "links/url": "URL"
      },
      "gws/addon/memo/group_setting": {
        "memo_filesize_limit": "添付サイズ制限",
        "memo_quota": "メッセージ容量制限",
        "memo_reminder": "リマインダー表示設定"
      },
      "gws/addon/memo/message_sort": {
        "gws_memo_message_sort": "メッセージ並び順"
      },
      "gws/addon/memo/notify_setting": {
        "notify_state": "通知設定"
      },
      "gws/addon/memo/priority": {
        "priority": "重要度"
      },
      "gws/addon/monitor/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/monitor/contributor": {
        "contributor_name": "投稿者名"
      },
      "gws/addon/monitor/group": {
        "attend_group_ids": "参加グループ"
      },
      "gws/addon/monitor/group_setting": {
        "default_notice_state": "お知らせ表示設定",
        "monitor_delete_threshold": "削除対象",
        "monitor_file_size": "添付最大サイズ",
        "monitor_file_size_per_post": "添付最大サイズ/投稿単位",
        "monitor_file_size_per_topic": "添付最大サイズ/トピック単位",
        "monitor_files_break": "ファイル表示の並び",
        "monitor_new_days": "新着表示期間"
      },
      "gws/addon/monitor/release": {
        "close_date": "公開終了日時(予約)",
        "release_date": "公開開始日時(予約)",
        "released": "公開日時"
      },
      "gws/addon/notice/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/notice/comment_post": {
        "notice_id": "お知らせ",
        "text": "コメント"
      },
      "gws/addon/notice/comment_setting": {
        "comment_state": "コメント投稿"
      },
      "gws/addon/notice/resource_limitation": {
        "notice_individual_body_size_limit": "本文個別容量制限",
        "notice_individual_file_size_limit": "添付ファイル個別容量制限",
        "notice_total_body_size": "総本文サイズ",
        "notice_total_body_size_limit": "本文総容量制限",
        "notice_total_file_size": "総添付ファイルサイズ",
        "notice_total_file_size_limit": "添付ファイル総容量制限"
      },
      "gws/addon/permission": {
        "group_ids": "管理グループ",
        "permission_level": "権限レベル"
      },
      "gws/addon/portal/portlet/ad": {
        "ad_pause": "静止時間",
        "ad_speed": "スライド時間",
        "ad_width": "横幅"
      },
      "gws/addon/portal/portlet/ad_file": {
        "ad_file_ids": "広告画像",
        "ad_files": "広告画像"
      },
      "gws/addon/portal/portlet/board": {
        "board_browsed_state": "既読・未読",
        "board_category_ids": "カテゴリー",
        "board_severity": "重要度"
      },
      "gws/addon/portal/portlet/bookmark": {
        "bookmark_model": "機能表示範囲"
      },
      "gws/addon/portal/portlet/circular": {
        "circular_article_state": "表示種別",
        "circular_category_ids": "カテゴリー"
      },
      "gws/addon/portal/portlet/faq": {
        "faq_category_ids": "カテゴリー"
      },
      "gws/addon/portal/portlet/free": {
        "html": "内容"
      },
      "gws/addon/portal/portlet/monitor": {
        "monitor_answerable_article": "表示範囲",
        "monitor_category_ids": "カテゴリー"
      },
      "gws/addon/portal/portlet/notice": {
        "notice_browsed_state": "既読・未読",
        "notice_category_ids": "カテゴリー",
        "notice_folder_ids": "フォルダー",
        "notice_severity": "重要度"
      },
      "gws/addon/portal/portlet/presence": {
        "custom_group_id": "カスタムグループ",
        "group_id": "グループ"
      },
      "gws/addon/portal/portlet/qna": {
        "qna_category_ids": "カテゴリー"
      },
      "gws/addon/portal/portlet/reminder": {
        "reminder_filter": "表示範囲"
      },
      "gws/addon/portal/portlet/schedule": {
        "schedule_member_ids": "表示ユーザー"
      },
      "gws/addon/portal/portlet/share": {
        "share_category_ids": "カテゴリー",
        "share_folder_id": "フォルダー"
      },
      "gws/addon/portal/portlet/survey": {
        "survey_answered_state": "回答・未回答",
        "survey_category_ids": "カテゴリー",
        "survey_sort": "並び順"
      },
      "gws/addon/portal/portlet/todo": {
        "todo_state": "表示状態"
      },
      "gws/addon/portal/portlet/workflow": {
        "workflow_state": "表示範囲"
      },
      "gws/addon/presence/delegator_setting": {
        "presence_editable_title_ids": "編集可能な役職"
      },
      "gws/addon/qna/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/qna/group_setting": {
        "qna_browsed_delay": "既読にするまでの秒数",
        "qna_file_size": "添付最大サイズ",
        "qna_file_size_per_post": "添付最大サイズ/投稿単位",
        "qna_file_size_per_topic": "添付最大サイズ/トピック単位",
        "qna_files_break": "ファイル表示の並び",
        "qna_new_days": "新着表示期間"
      },
      "gws/addon/readable_setting": {
        "readable_custom_group_ids": "閲覧カスタムグループ",
        "readable_custom_groups_hash": "閲覧カスタムグループ(ハッシュ)",
        "readable_group_ids": "閲覧グループ",
        "readable_groups_hash": "閲覧グループ(ハッシュ)",
        "readable_member_ids": "閲覧ユーザー",
        "readable_members_hash": "閲覧ユーザー(ハッシュ)",
        "readable_setting_range": "公開範囲"
      },
      "gws/addon/release": {
        "close_date": "公開終了日時(予約)",
        "release_date": "公開開始日時(予約)",
        "released": "公開日時"
      },
      "gws/addon/reminder": {
        "reminder_date": "リマインダー日時",
        "reminder_name": "リマインダー名",
        "reminder_url": "リマインダーURL"
      },
      "gws/addon/report/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/report/column_setting": {
        "columns": "入力設定"
      },
      "gws/addon/role": {
        "gws_role_ids": "ロール"
      },
      "gws/addon/schedule/approval": {
        "approval_member_ids": "承認者",
        "approval_state": "承認状態",
        "approvals": "承認情報"
      },
      "gws/addon/schedule/attendance": {
        "attendance_check_state": "出欠確認",
        "attendances": "出欠情報"
      },
      "gws/addon/schedule/facility": {
        "facility_ids": "設備予約"
      },
      "gws/addon/schedule/facility_column_values": {
        "facility_column_values": "設備追加情報",
        "main_facility_id": "主設備"
      },
      "gws/addon/schedule/group_setting": {
        "schedule_attachment_state": "ファイル添付",
        "schedule_custom_group_tab_state": "カスタムグループタブの表示",
        "schedule_drag_drop_state": "ドラッグ＆ドロップ",
        "schedule_facility_tab_label": "設備予約タブの表示",
        "schedule_facility_tab_state": "設備予約タブの表示",
        "schedule_group_all_tab_label": "全体タブの表示",
        "schedule_group_all_tab_state": "全体タブの表示",
        "schedule_group_tab_state": "グループタブの表示",
        "schedule_max_date": "入力可能期間",
        "schedule_max_file_size": "添付最大サイズ",
        "schedule_max_month": "期末月",
        "schedule_max_years": "年数",
        "schedule_menu_label": "メニュー名称",
        "schedule_personal_tab_label": "個人タブの表示",
        "schedule_personal_tab_state": "個人タブの表示",
        "schedule_state": "機能利用",
        "todo_delete_threshold": "ToDo復旧可能期間"
      },
      "gws/addon/schedule/repeat": {
        "interval": "繰り返し間隔",
        "repeat_base": "繰り返しの基準",
        "repeat_end": "繰り返し - 終了日",
        "repeat_plan_id": "繰り返し予定",
        "repeat_start": "繰り返し - 開始日",
        "repeat_type": "繰り返し設定",
        "wdays": "繰り返し曜日"
      },
      "gws/addon/schedule/todo/category": {
        "category_ids": "プロジェクト・工程"
      },
      "gws/addon/schedule/todo/comment_post": {
        "comments": "コメント"
      },
      "gws/addon/schedule/todo/member": {
        "member_custom_group_ids": "担当カスタムグループ",
        "member_group_ids": "担当グループ",
        "member_ids": "担当ユーザー"
      },
      "gws/addon/schedules": {
        "schedule_ids": "スケジュール"
      },
      "gws/addon/share/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/share/group_setting": {
        "share_default_sort": "並び順の規定値",
        "share_files_capacity": "総容量制限",
        "share_max_file_size": "最大ファイルサイズ"
      },
      "gws/addon/share/resource_limitation": {
        "share_max_file_size": "最大ファイルサイズ",
        "share_max_folder_size": "総容量制限"
      },
      "gws/addon/staff_record/group_setting": {
        "divide_duties_limit": "電子事務分掌表/表示件数",
        "staff_records_limit": "電子職員録/表示件数"
      },
      "gws/addon/subscription_setting": {
        "subscribed_custom_group_ids": "購読カスタムグループ",
        "subscribed_custom_groups_hash": "購読カスタムグループ(ハッシュ)",
        "subscribed_group_ids": "購読グループ",
        "subscribed_groups_hash": "購読グループ(ハッシュ)",
        "subscribed_member_ids": "購読ユーザー",
        "subscribed_members_hash": "購読ユーザー(ハッシュ)"
      },
      "gws/addon/survey/category": {
        "category_ids": "カテゴリー"
      },
      "gws/addon/survey/files_ref": {
        "files": "回答一覧"
      },
      "gws/addon/survey/group_setting": {
        "survey_default_due_date": "回答期限日初期値"
      },
      "gws/addon/system/desktop_setting": {
        "desktop_chat": "チャット機能",
        "desktop_mailstore": "メールストア機能"
      },
      "gws/addon/system/file_setting": {
        "multibyte_filename_state": "日本語ファイル名"
      },
      "gws/addon/system/group_setting": {
        "canonical_domain": "グループウェアドメイン",
        "canonical_scheme": "グループウェアスキーム",
        "sendmail_domains": "メール送信許可ドメイン",
        "trash_threshold": "ゴミ箱保持期間",
        "trash_threshold_unit": "ゴミ箱保持期間単位"
      },
      "gws/addon/system/log_setting": {
        "log_board_severity": "掲示板のログ",
        "log_chorg_severity": "組織変更のログ",
        "log_circular_severity": "回覧板のログ",
        "log_discussion_severity": "電子会議室のログ",
        "log_elasticsearch_severity": "全文検索のログ",
        "log_facility_severity": "設備管理のログ",
        "log_faq_severity": "よくある質問のログ",
        "log_file_severity": "共有ファイルのログ",
        "log_main_severity": "標準機能のログ",
        "log_memo_severity": "メッセージのログ",
        "log_monitor_severity": "照会・回答のログ",
        "log_personal_address_severity": "個人アドレス帳のログ",
        "log_portal_severity": "ポータルのログ",
        "log_qna_severity": "Ｑ＆Ａのログ",
        "log_report_severity": "レポートのログ",
        "log_save_days": "ログ保持日数",
        "log_schedule_severity": "スケジュールのログ",
        "log_share_severity": "共有ファイルのログ",
        "log_shared_address_severity": "共有アドレス帳のログ",
        "log_staff_record_severity": "電子職員録のログ",
        "log_workflow_severity": "ワークフローのログ"
      },
      "gws/addon/system/menu_setting": {
        "menu_attendance_label": "出退勤の表示",
        "menu_attendance_state": "出退勤の表示",
        "menu_board_label": "掲示板の表示",
        "menu_board_state": "掲示板の表示",
        "menu_bookmark_label": "お気に入りの表示",
        "menu_bookmark_state": "お気に入りの表示",
        "menu_circular_label": "回覧板の表示",
        "menu_circular_state": "回覧板の表示",
        "menu_contrast_label": "コントラスト",
        "menu_contrast_state": "コントラスト",
        "menu_discussion_label": "電子会議室",
        "menu_discussion_state": "電子会議室",
        "menu_elasticsearch_label": "全文検索の表示",
        "menu_elasticsearch_state": "全文検索の表示",
        "menu_faq_label": "よくある質問の表示",
        "menu_faq_state": "よくある質問の表示",
        "menu_links_label": "リンク集の表示",
        "menu_links_state": "リンク集の表示",
        "menu_memo_label": "メッセージの表示",
        "menu_memo_state": "メッセージの表示",
        "menu_monitor_label": "照会・回答の表示",
        "menu_monitor_state": "照会・回答の表示",
        "menu_notice_label": "お知らせの表示",
        "menu_notice_state": "お知らせの表示",
        "menu_personal_address_label": "個人アドレス帳の表示",
        "menu_personal_address_state": "個人アドレス帳の表示",
        "menu_portal_label": "ポータルの表示",
        "menu_portal_state": "ポータルの表示",
        "menu_presence_label": "在席管理の表示",
        "menu_presence_state": "在席管理の表示",
        "menu_qna_label": "Ｑ＆Ａの表示",
        "menu_qna_state": "Ｑ＆Ａの表示",
        "menu_reminder_label": "リマインダーの表示",
        "menu_reminder_state": "リマインダーの表示",
        "menu_report_label": "レポートの表示",
        "menu_report_state": "レポートの表示",
        "menu_schedule_label": "スケジュールの表示",
        "menu_schedule_state": "スケジュールの表示",
        "menu_share_label": "共有ファイルの表示",
        "menu_share_state": "共有ファイルの表示",
        "menu_shared_address_label": "共有アドレス帳の表示",
        "menu_shared_address_state": "共有アドレス帳の表示",
        "menu_staff_record_label": "電子職員録の表示",
        "menu_staff_record_state": "電子職員録の表示",
        "menu_survey_label": "アンケートの表示",
        "menu_survey_state": "アンケートの表示",
        "menu_todo_label": "ToDoの表示",
        "menu_todo_state": "ToDoの表示",
        "menu_workflow_label": "ワークフローの表示",
        "menu_workflow_state": "ワークフローの表示"
      },
      "gws/addon/system/notice_setting": {
        "notice_announcement_state": "お知らせ",
        "notice_board_state": "掲示板",
        "notice_circular_state": "回覧板",
        "notice_discussion_state": "電子会議室",
        "notice_faq_state": "よくある質問",
        "notice_monitor_state": "照会・回答",
        "notice_qna_state": "Q&A",
        "notice_report_state": "レポート",
        "notice_schedule_state": "スケジュール",
        "notice_survey_state": "アンケート",
        "notice_todo_state": "ToDo",
        "notice_workflow_state": "ワークフロー",
        "send_notice_email_state": "個人メール転送"
      },
      "gws/addon/user/public_duty": {
        "charge_address": "担当住所",
        "charge_name": "担当名",
        "charge_tel": "担当電話",
        "divide_duties": "分掌事務"
      },
      "gws/addon/workflow/column_setting": {
        "columns": "入力設定"
      },
      "gws/attendance/history": {
        "action": "アクション",
        "created": "修正時刻",
        "date": "日付",
        "field_name": "フィールド名",
        "reason": "修正理由"
      },
      "gws/attendance/record": {
        "break_enter1": "休始1",
        "break_enter2": "休始2",
        "break_enter3": "休始3",
        "break_leave1": "休終1",
        "break_leave2": "休終2",
        "break_leave3": "休終3",
        "date": "日付",
        "enter": "出勤",
        "leave": "退勤",
        "memo": "備考"
      },
      "gws/attendance/time_card": {
        "date": "日付",
        "histories": "履歴",
        "lock_state": "ロック状態",
        "name": "名前",
        "record": "レコード"
      },
      "gws/board/browsing_state": {
        "browsed_users_hash": "既読ユーザー"
      },
      "gws/board/category": {
        "name": "カテゴリー名"
      },
      "gws/board/postable": {
        "created": "投稿日",
        "descendants_files_count": "トピック内添付ファイル数",
        "descendants_total_file_size": "トピック内添付ファイル容量",
        "descendants_updated": "トピック内更新日時",
        "mode": "表示形式",
        "name": "タイトル",
        "parent_id": "親投稿",
        "permit_comment": "コメント",
        "severity": "重要度",
        "topic_id": "トピック",
        "updated": "最終更新日"
      },
      "gws/bookmark": {
        "bookmark_model": "機能",
        "name": "タイトル",
        "url": "URL"
      },
      "gws/chorg/changeset": {
        "revision_id": "リビジョン"
      },
      "gws/chorg/run_params": {
        "reservation": "予約実行",
        "staff_record_code": "電子職員録西暦",
        "staff_record_name": "電子職員録年度名",
        "staff_record_state": "電子職員録"
      },
      "gws/circular/comment": {
        "name": "タイトル",
        "text": "コメント"
      },
      "gws/circular/post": {
        "created": "投稿日",
        "deleted": "削除日時",
        "due_date": "回覧期限日時",
        "name": "タイトル",
        "see_type": "既読にする形式",
        "seen": "既読",
        "updated": "最終更新日"
      },
      "gws/column/base": {
        "_type": "型",
        "class_name": "クラス名",
        "form_id": "フォーム",
        "form_type": "フォーム種別",
        "name": "名前",
        "order": "並び順",
        "place_holder": "プレースホルダー",
        "postfix_label": "後ラベル",
        "prefix_label": "前ラベル",
        "required": "必須入力",
        "route": "属性",
        "tooltips": "ツールチップ"
      },
      "gws/column/date_field": {
        "input_type": "種類"
      },
      "gws/column/file_upload": {
        "upload_file_count": "アップロードファイル数"
      },
      "gws/column/number_field": {
        "initial_decimal": "初期値",
        "max_decimal": "最大値",
        "min_decimal": "最小値",
        "minus_type": "負数の表示方法",
        "scale": "小数点以下の桁数"
      },
      "gws/column/text_field": {
        "input_type": "種類"
      },
      "gws/contrast": {
        "color": "背景色",
        "name": "名前",
        "order": "並び順",
        "status": "ステータス",
        "text_color": "文字色"
      },
      "gws/custom_group": {
        "name": "グループ名",
        "order": "表示順"
      },
      "gws/discussion/postable": {
        "depth": "層",
        "descendants_updated": "スレッド内更新日時",
        "forum_id": "電子会議室",
        "forum_quota": "電子会議室容量制限",
        "main_topic": "メインスレッド",
        "name": "タイトル",
        "order": "並び順",
        "parent_id": "親投稿",
        "permanently": "編集禁止",
        "permit_comment": "コメント投稿",
        "topic_id": "スレッド",
        "topic_quota": "スレッド容量制限"
      },
      "gws/export": {
        "in_csv_encoding": "文字コード",
        "in_file": "ファイル"
      },
      "gws/facility/category": {
        "name": "カテゴリー名",
        "order": "並び順"
      },
      "gws/facility/custom_field": {
        "name": "名前",
        "order": "並び順"
      },
      "gws/facility/item": {
        "activation_date": "有効期限（開始）",
        "approval_check_state": "予約承認",
        "category_id": "カテゴリー",
        "expiration_date": "有効期限（終了）",
        "html": "設備概要",
        "max_days_limit": "予約可能期間",
        "max_minutes_limit": "時間制限（最大）",
        "min_minutes_limit": "時間制限（最小）",
        "minutes_limit": "時間制限",
        "name": "設備名",
        "order": "並び順",
        "reservation_end_date": "予約可能期間（終了）",
        "reservation_start_date": "予約可能期間（開始）"
      },
      "gws/faq/category": {
        "name": "カテゴリー名"
      },
      "gws/faq/post": {
        "name": "回答タイトル"
      },
      "gws/faq/postable": {
        "browsed_users_hash": "既読ユーザー",
        "created": "投稿日",
        "descendants_files_count": "トピック内添付ファイル数",
        "descendants_total_file_size": "トピック内添付ファイル容量",
        "descendants_updated": "トピック内更新日時",
        "mode": "表示形式",
        "name": "タイトル",
        "parent_id": "親投稿",
        "permit_comment": "コメント",
        "severity": "重要度",
        "topic_id": "トピック",
        "updated": "最終更新日"
      },
      "gws/faq/topic": {
        "name": "質問タイトル"
      },
      "gws/group_permission": {
        "custom_group_ids": "管理カスタムグループ",
        "custom_groups_hash": "管理カスタムグループ(ハッシュ)",
        "group_ids": "管理グループ",
        "groups_hash": "管理グループ(ハッシュ)",
        "permission_level": "権限レベル",
        "user_ids": "管理ユーザー",
        "users_hash": "管理ユーザー(ハッシュ)"
      },
      "gws/history": {
        "action": "アクション",
        "controller": "コントローラー",
        "controller_name": "コントローラー名",
        "created": "変更日時",
        "item_id": "項目ID",
        "job": "ジョブ",
        "job_name": "ジョブ名",
        "message": "メッセージ",
        "mode": "区分",
        "mode_name": "区分名",
        "model": "モデル",
        "model_name": "モデル名",
        "name": "名称",
        "path": "URL",
        "request_id": "リクエストID",
        "session_id": "セッションID",
        "severity": "重要度",
        "updated_field_names": "変更箇所",
        "updated_fields": "変更箇所",
        "user_name": "ユーザー",
        "user_tel": "電話番号"
      },
      "gws/link": {
        "name": "タイトル"
      },
      "gws/member": {
        "member_custom_group_ids": "参加カスタムグループ",
        "member_group_ids": "参加グループ",
        "member_ids": "参加ユーザー"
      },
      "gws/memo/filter": {
        "action": "アクション",
        "body": "条件/本文",
        "folder": "フォルダー",
        "folder_id": "フォルダー",
        "from_member_ids": "条件/差出人",
        "name": "フィルター名",
        "order": "並び順",
        "state": "状態",
        "subject": "条件/件名",
        "to_member_ids": "条件/宛先"
      },
      "gws/memo/folder": {
        "in_parent": "親フォルダー",
        "name": "フォルダー名",
        "order": "並び順",
        "path": "パス"
      },
      "gws/memo/forward": {
        "default": "メール転送設定",
        "email": "メールアドレス"
      },
      "gws/memo/list": {
        "category_ids": "カテゴリー",
        "name": "タイトル",
        "sender_name": "送信者名",
        "signature": "署名"
      },
      "gws/memo/notice_user_setting": {
        "notice_announcement_email_user_setting": "お知らせ通知メール転送",
        "notice_announcement_user_setting": "お知らせ",
        "notice_board_email_user_setting": "掲示板通知メール転送",
        "notice_board_user_setting": "掲示板",
        "notice_circular_email_user_setting": "回覧板通知メール転送",
        "notice_circular_user_setting": "回覧板",
        "notice_discussion_email_user_setting": "電子会議室通知メール転送",
        "notice_discussion_user_setting": "電子会議室",
        "notice_faq_email_user_setting": "よくある質問通知メール転送",
        "notice_faq_user_setting": "よくある質問",
        "notice_monitor_email_user_setting": "照会・回答通知メール転送",
        "notice_monitor_user_setting": "照会・回答",
        "notice_presence_email_user_setting": "在席状況通知メール転送",
        "notice_presence_user_setting": "在席状況",
        "notice_qna_email_user_setting": "Q&A通知メール転送",
        "notice_qna_user_setting": "Q&A",
        "notice_report_email_user_setting": "レポート通知メール転送",
        "notice_report_user_setting": "レポート",
        "notice_schedule_email_user_setting": "スケジュール通知メール転送",
        "notice_schedule_user_setting": "スケジュール",
        "notice_survey_email_user_setting": "アンケート通知メール転送",
        "notice_survey_user_setting": "アンケート",
        "notice_todo_email_user_setting": "ToDo通知メール転送",
        "notice_todo_user_setting": "ToDo",
        "notice_workflow_email_user_setting": "ワークフロー通知メール転送",
        "notice_workflow_user_setting": "ワークフロー",
        "send_notice_mail_address": "転送先メールアドレス"
      },
      "gws/memo/signature": {
        "default": "既定の署名",
        "name": "名称",
        "text": "本文"
      },
      "gws/memo/template": {
        "name": "名称",
        "order": "並び順",
        "text": "本文"
      },
      "gws/model/category": {
        "bg_color": "背景色",
        "color": "表示色",
        "model": "モデル",
        "name": "種別名",
        "order": "並び順",
        "state": "状態",
        "text_color": "文字色"
      },
      "gws/model/file": {
        "content_type": "コンテンツタイプ",
        "download": "ダウンロード",
        "filename": "ファイル名（英数）",
        "geo_location": "緯度・経度",
        "image": "画像",
        "in_file": "ファイル",
        "in_files": "ファイル",
        "memo": "補足情報",
        "model": "モデル",
        "name": "ファイル名",
        "resizing": "リサイズ",
        "size": "ファイルサイズ",
        "state": "状態"
      },
      "gws/model/folder": {
        "depth": "階層",
        "in_basename": "フォルダー名",
        "in_parent": "親フォルダー",
        "name": "フォルダー名",
        "order": "並び順",
        "state": "状態"
      },
      "gws/model/memo/folder": {
        "in_basename": "フォルダー名"
      },
      "gws/model/memo/message": {
        "bcc_member_ids": "BCC",
        "bcc_shared_address_group_ids": "BCC（共有アドレス帳）",
        "bcc_webmail_address_group_ids": "BCC（個人アドレス帳）",
        "body": "本文",
        "cc_member_ids": "CC",
        "cc_shared_address_group_ids": "CC（共有アドレス帳）",
        "cc_webmail_address_group_ids": "CC（個人アドレス帳）",
        "deleted": "削除状態",
        "display_send_date": "送信日時",
        "filtered": "フィルター適用",
        "flagged": "スター付き",
        "flags": "フラグ",
        "format": "フォーマット",
        "from": "差出人",
        "from_member_name": "差出人名",
        "html": "本文HTML",
        "member_custom_group_ids": "カスタムグループメンバー",
        "member_ids": "参加者",
        "name": "件名",
        "path": "保存パス",
        "request_mdn_ids": "開封確認",
        "seen": "既読日時",
        "send_date": "送信日時",
        "size": "サイズ",
        "star": "フラグ",
        "subject": "件名",
        "text": "本文TEXT",
        "to": "宛先",
        "to_member_ids": "宛先",
        "to_member_name": "宛先名",
        "to_shared_address_group_ids": "宛先（共有アドレス帳）",
        "to_webmail_address_group_ids": "宛先（個人アドレス帳）",
        "type": "型名",
        "unseen": "未読"
      },
      "gws/monitor/category": {
        "name": "カテゴリー名"
      },
      "gws/monitor/post": {
        "name": "回答タイトル"
      },
      "gws/monitor/postable": {
        "answer_state": "回答状況",
        "article_state": "募集状況",
        "created": "作成日時",
        "deleted": "削除日時",
        "descendants_files_count": "トピック内添付ファイル数",
        "descendants_total_file_size": "トピック内添付ファイル容量",
        "descendants_updated": "トピック内更新日時",
        "due_date": "回答期限",
        "mode": "表示形式",
        "name": "タイトル",
        "notice_at": "通知日時",
        "parent_id": "親投稿",
        "permit_comment": "コメント",
        "severity": "重要度",
        "spec_config": "回答表示設定",
        "topic_id": "トピック",
        "updated": "更新日時"
      },
      "gws/monitor/topic": {
        "admin_setting": "記事管理設定",
        "answer_state_hash": "回覧状況",
        "due_date": "回答期限",
        "name": "質問タイトル",
        "notice_state": "お知らせ表示設定"
      },
      "gws/notice/comment": {
        "notice_id": "お知らせ",
        "user_group_name": "グループ",
        "user_name": "作成者"
      },
      "gws/notice/folder": {
        "member_custom_group_ids": "投稿カスタムグループ",
        "member_group_ids": "投稿グループ",
        "member_ids": "投稿ユーザー"
      },
      "gws/notice/notification": {
        "notification_noticed": "通知日時"
      },
      "gws/notice/post": {
        "name": "タイトル",
        "severity": "種別",
        "total_file_size": "総添付ファイルサイズ"
      },
      "gws/personal_address/address": {
        "address_group_id": "グループ名"
      },
      "gws/personal_address/group": {
        "name": "グループ名",
        "order": "並び順"
      },
      "gws/portal/group_setting": {
        "name": "ポータル名",
        "portal_group_id": "ポータルグループ"
      },
      "gws/portal/portlet_model": {
        "grid_data": "配置情報",
        "limit": "表示件数",
        "links": "リンク",
        "name": "ポートレット名",
        "portlet_model": "ポートレット種別",
        "setting_id": "ポータルID"
      },
      "gws/portal/user_setting": {
        "name": "ポータル名",
        "portal_user_id": "ポータルユーザー"
      },
      "gws/qna/category": {
        "name": "カテゴリー名"
      },
      "gws/qna/post": {
        "name": "回答タイトル"
      },
      "gws/qna/postable": {
        "browsed_users_hash": "既読ユーザー",
        "created": "投稿日",
        "descendants_files_count": "トピック内添付ファイル数",
        "descendants_total_file_size": "トピック内添付ファイル容量",
        "descendants_updated": "トピック内更新日時",
        "mode": "表示形式",
        "name": "タイトル",
        "parent_id": "親投稿",
        "permit_comment": "コメント",
        "severity": "重要度",
        "topic_id": "トピック",
        "updated": "最終更新日"
      },
      "gws/qna/topic": {
        "name": "質問タイトル",
        "question_state": "回答状況"
      },
      "gws/reference/notice/folder": {
        "folder_id": "フォルダー"
      },
      "gws/reference/report/form": {
        "form_id": "テンプレート"
      },
      "gws/reference/site": {
        "site_id": "組織"
      },
      "gws/reference/survey/form": {
        "form_id": "アンケート"
      },
      "gws/reference/user": {
        "user_group_id": "作成者(グループ)",
        "user_group_name": "作成者(グループ名)",
        "user_id": "作成者",
        "user_name": "作成者(氏名)",
        "user_tel": "電話番号",
        "user_uid": "作成者(UID)"
      },
      "gws/reminder": {
        "date": "日時",
        "name": "タイトル",
        "updated_date": "更新日",
        "updated_fields": "変更内容",
        "updated_user_id": "更新者ID",
        "updated_user_name": "更新者",
        "updated_user_uid": "更新者UID",
        "url": "URL"
      },
      "gws/report/category": {
        "name": "カテゴリー名"
      },
      "gws/report/file": {
        "name": "タイトル"
      },
      "gws/report/form": {
        "memo": "備考",
        "name": "タイトル",
        "order": "並び順",
        "state": "公開状態"
      },
      "gws/schedule/approval": {
        "approval_state": "承認"
      },
      "gws/schedule/attendance": {
        "attendance_state": "出欠"
      },
      "gws/schedule/category": {
        "name": "スケジュール種別"
      },
      "gws/schedule/holiday": {
        "color": "表示色",
        "term": "日付"
      },
      "gws/schedule/plan": {
        "category_id": "種別",
        "color": "表示色",
        "repeat_plan_id": "繰り返し"
      },
      "gws/schedule/planable": {
        "allday": "終日",
        "end_at": "終了日時",
        "end_on": "終了日",
        "name": "タイトル",
        "start_at": "開始日時",
        "start_on": "開始日",
        "term": "日時"
      },
      "gws/schedule/priority": {
        "priority": "重要度"
      },
      "gws/schedule/repeat_plan": {
        "interval": "繰り返し間隔",
        "repeat_base": "繰り返しの基準",
        "repeat_end": "終了日",
        "repeat_start": "開始日",
        "repeat_type": "繰り返し設定",
        "wdays": "曜日"
      },
      "gws/schedule/todo": {
        "achievement_rate": "進捗率",
        "category_id": "種別",
        "color": "表示色",
        "deleted": "削除日時",
        "discussion_forum_id": "電子会議室",
        "name": "ToDo",
        "repeat_plan_id": "繰り返し",
        "term": "期限",
        "todo_state": "状態"
      },
      "gws/schedule/todo_category": {
        "depth_level": "深さ",
        "in_basename": "プロジェクト・工程名",
        "in_parent_id": "親プロジェクト・工程名",
        "name": "プロジェクト・工程名"
      },
      "gws/schedule/todo_comment": {
        "achievement_rate": "進捗率",
        "todo_id": "ToDo"
      },
      "gws/schedule/user_setting": {
        "in_schedule_tabs_custom_group_ids": "タブ表示/カスタムグループ",
        "in_schedule_tabs_group_ids": "タブ表示/グループ",
        "schedule_tabs": "タブ表示",
        "schedule_tabs_custom_group_ids": "タブ表示/カスタムグループ",
        "schedule_tabs_group_ids": "タブ表示/グループ"
      },
      "gws/share/category": {
        "name": "カテゴリー名"
      },
      "gws/share/descendants_file_info": {
        "descendants_files_count": "総ファイル数",
        "descendants_total_file_size": "総ファイル容量"
      },
      "gws/share/file": {
        "file_size": "ファイルサイズ",
        "folder": "フォルダー",
        "folder_id": "フォルダー名",
        "memo": "補足情報",
        "url_copy": "URLのコピー"
      },
      "gws/share/file_uploader": {
        "in_file_ids": "ファイル"
      },
      "gws/share/folder": {
        "file_ids": "ファイル"
      },
      "gws/share/history": {
        "created": "変更日時",
        "mode": "区分",
        "updated_fields": "変更内容",
        "upload": "添付",
        "uploadfile_name": "ファイル名",
        "uploadfile_size": "サイズ",
        "user_name": "ユーザー",
        "user_tel": "電話番号"
      },
      "gws/shared_address/address": {
        "address_group_id": "グループ名"
      },
      "gws/shared_address/group": {
        "name": "グループ名",
        "order": "並び順"
      },
      "gws/staff_record/group": {
        "name": "所属名",
        "order": "並び順",
        "seating_chart_url": "座席表URL"
      },
      "gws/staff_record/seating": {
        "name": "タイトル",
        "order": "並び順",
        "remark": "備考",
        "url": "座席表URL"
      },
      "gws/staff_record/user": {
        "charge_address": "担当住所",
        "charge_name": "担当名",
        "charge_tel": "担当電話",
        "code": "職員番号",
        "divide_duties": "分掌事務",
        "divide_duties_view": "事務分掌表へ表示",
        "kana": "職員氏名（カナ）",
        "multi_section": "本務・兼務",
        "name": "職員氏名",
        "order": "並び順",
        "remark": "備考",
        "section_name": "所属",
        "section_order": "所属並び順",
        "staff_records_view": "電子職員録へ表示",
        "tel_ext": "個人内線",
        "title_name": "役職"
      },
      "gws/staff_record/year": {
        "close_date": "終了日",
        "code": "西暦",
        "name": "年度名",
        "start_date": "開始日"
      },
      "gws/staff_record/yearly": {
        "year_code": "西暦",
        "year_id": "年度",
        "year_name": "年度名"
      },
      "gws/survey/answer_state": {
        "answered_users_hash": "回答状況"
      },
      "gws/survey/file": {
        "created": "初回回答日",
        "name": "回答名",
        "updated": "回答日"
      },
      "gws/survey/form": {
        "anonymous_state": "匿名回答",
        "close_date": "公開期限（終了）",
        "description": "説明",
        "due_date": "回答期限",
        "file_edit_state": "回答の編集",
        "file_state": "回答結果",
        "memo": "備考",
        "name": "タイトル",
        "order": "並び順",
        "release_date": "公開期限（開始）",
        "state": "公開状態"
      },
      "gws/survey/notification": {
        "notification_notice_state": "通知",
        "notification_noticed_at": "通知日時"
      },
      "gws/user": {
        "gws_default_group_ids": "グループ（既定）",
        "gws_main_group_ids": "グループ（主）"
      },
      "gws/user_form": {
        "memo": "メモ",
        "state": "使用"
      },
      "gws/user_form_data": {
        "column_values": "拡張データ",
        "form_id": "拡張情報"
      },
      "gws/user_presence": {
        "memo": "備考",
        "plan": "状況",
        "send_message": "メッセージ",
        "state": "ステータス",
        "sync_available_state": "在席",
        "sync_unavailable_state": "離席"
      },
      "gws/workflow/column": {
        "name": "項目名",
        "order": "並び順"
      },
      "gws/workflow/file": {
        "form_id": "フォーム",
        "name": "タイトル",
        "workflow_member_id": "承認者"
      },
      "gws/workflow/form": {
        "agent_state": "代理申請",
        "memo": "備考",
        "name": "タイトル",
        "order": "並び順",
        "state": "公開状態"
      },
      "history/backup": {
        "data": "保存データ",
        "ref_coll": "保存コレクション",
        "version": "バージョン"
      },
      "history/log": {
        "action": "アクション",
        "created": "操作日時",
        "model_name": "モデル名",
        "path": "URL",
        "request_id": "リクエストID",
        "save_term": "保存期間",
        "session_id": "セッションID",
        "user_ids": "ユーザー",
        "user_name": "ユーザー"
      },
      "history/trash": {
        "children": "配下のコンテンツ",
        "data": "保存データ",
        "parent": "親フォルダー",
        "ref_class": "保存クラス",
        "ref_coll": "保存コレクション",
        "state": "ステータス",
        "version": "バージョン"
      },
      "inquiry/addon/aggregation": {
        "aggregation_state": "集計設定"
      },
      "inquiry/addon/captcha": {
        "inquiry_captcha": "画像認証"
      },
      "inquiry/addon/faq": {
        "faq_id": "FAQフォルダー"
      },
      "inquiry/addon/feedback_setting": {
        "feedback_confirmation": "確認画面",
        "lower_html": "下部HTML",
        "upper_html": "上部HTML"
      },
      "inquiry/addon/message": {
        "inquiry_html": "説明テキスト",
        "inquiry_results_html": "集計結果テキスト",
        "inquiry_sent_html": "送信完了テキスト"
      },
      "inquiry/addon/notice": {
        "from_email": "差出人メールアドレス",
        "from_name": "差出人名",
        "notice_content": "通知内容",
        "notice_email": "通知メールアドレス",
        "notice_state": "通知設定"
      },
      "inquiry/addon/reception_plan": {
        "reception_close_date": "回答受付終了日",
        "reception_start_date": "回答受付開始日"
      },
      "inquiry/addon/release_plan": {
        "close_date": "公開終了日",
        "release_date": "公開開始日"
      },
      "inquiry/addon/reply": {
        "reply_lower_text": "下部返信テキスト",
        "reply_state": "返信設定",
        "reply_subject": "返信件名",
        "reply_upper_text": "上部返信テキスト"
      },
      "inquiry/answer": {
        "captcha": "画像の数字",
        "comment": "コメント",
        "created": "作成日時",
        "data_summary": "回答内容",
        "id": "id",
        "remote_addr": "IPアドレス",
        "source_name": "ページタイトル",
        "source_url": "ページURL",
        "state": "状態",
        "user_agent": "ユーザーエージェント"
      },
      "inquiry/column": {
        "additional_attr": "追加属性",
        "html": "説明テキスト",
        "input_confirm": "入力確認",
        "input_type": "入力形式",
        "max_upload_file_size": "最大ファイルサイズ設定",
        "name": "項目名",
        "order": "並び順",
        "question": "FAQ引用",
        "required": "必須入力",
        "required_in_select_form": "フォーム別必須入力",
        "select_options": "選択肢",
        "state": "ステータス",
        "transfers": "キーワード"
      },
      "jmaxml/action/base": {
        "in_type": "種別",
        "name": "名前"
      },
      "jmaxml/addon/action/publish_page": {
        "category_ids": "カテゴリー",
        "publish_state": "公開状態",
        "publish_to_id": "フォルダー"
      },
      "jmaxml/addon/action/publishing_office": {
        "publishing_office_state": "気象台発表"
      },
      "jmaxml/addon/action/recipient": {
        "recipient_group_ids": "受信グループ",
        "recipient_user_ids": "受信ユーザー"
      },
      "jmaxml/addon/action/sender": {
        "sender_email": "送信メールアドレス",
        "sender_name": "送信者名",
        "signature_text": "署名（テキスト版）"
      },
      "jmaxml/addon/action/switch_urgency": {
        "urgency_layout_id": "緊急災害レイアウト"
      },
      "jmaxml/addon/trigger/ash_fall_forecast": {
        "sub_types": "種類",
        "target_region_ids": "対象区域"
      },
      "jmaxml/addon/trigger/flood_forecast": {
        "target_region_ids": "水位観測所"
      },
      "jmaxml/addon/trigger/landslide_info": {
        "target_region_ids": "対象区域"
      },
      "jmaxml/addon/trigger/quake": {
        "earthquake_intensity": "震度",
        "target_region_ids": "対象区域"
      },
      "jmaxml/addon/trigger/tornado_alert": {
        "target_region_ids": "対象区域"
      },
      "jmaxml/addon/trigger/tsunami": {
        "sub_types": "種類",
        "target_region_ids": "対象区域"
      },
      "jmaxml/addon/trigger/volcano_flash": {
        "target_region_ids": "対象区域"
      },
      "jmaxml/addon/trigger/weather_alert": {
        "sub_types": "種類",
        "target_region_ids": "対象区域"
      },
      "jmaxml/filter": {
        "action_ids": "受信時の動作",
        "name": "名前",
        "state": "状態",
        "trigger_ids": "受信条件"
      },
      "jmaxml/forecast_region": {
        "code": "コード",
        "name": "名称",
        "order": "並び順",
        "short_name": "短い名称",
        "short_yomi": "短い名称のよみ",
        "state": "状態",
        "yomi": "よみ"
      },
      "jmaxml/quake_region": {
        "code": "コード",
        "name": "名称",
        "order": "並び順",
        "state": "状態",
        "yomi": "よみ"
      },
      "jmaxml/trigger/base": {
        "in_type": "種別",
        "name": "名前",
        "test_status": "試験XML",
        "training_status": "訓練XML"
      },
      "jmaxml/tsunami_region": {
        "code": "コード",
        "name": "名称",
        "order": "並び順",
        "state": "状態",
        "yomi": "よみ"
      },
      "jmaxml/water_level_station": {
        "code": "コード",
        "name": "名称",
        "order": "並び順",
        "region_name": "予報区域名",
        "state": "状態"
      },
      "job/task": {
        "at": "実行予約日時",
        "group_id": "グループ",
        "node_id": "フォルダー"
      },
      "kana/dictionary": {
        "body": "設定",
        "name": "名前"
      },
      "key_visual/addon/page_list": {
        "kv_pause": "静止時間",
        "kv_speed": "スライド時間",
        "link_action": "リンク動作",
        "link_target": "リンク表示",
        "lower_html": "下部HTML",
        "upper_html": "上部HTML"
      },
      "key_visual/image": {
        "file_id": "画像",
        "in_file": "画像",
        "link_url": "リンクURL"
      },
      "ldap/addon/group": {
        "ldap_auth_method": "認証方法",
        "ldap_dn": "DN",
        "ldap_host": "ホスト"
      },
      "ldap/addon/user": {
        "ldap_dn": "DN"
      },
      "ldap/import": {
        "group_count": "グループ数",
        "ldap": "LDAPインポート結果",
        "user_count": "ユーザ数"
      },
      "mail_page/addon/arrival_plan": {
        "arrival_close_date": "緊急情報表示終了日時",
        "arrival_start_date": "緊急情報表示開始日時"
      },
      "mail_page/addon/mail_setting": {
        "arrival_days": "緊急情報表示期間",
        "mail_page_from_conditions": "送信者メールアドレス",
        "mail_page_to_conditions": "宛先メールアドレス"
      },
      "map/addon/page": {
        "map_loc": "緯度,経度",
        "map_zoom": "縮尺",
        "marker_link": "リンク",
        "marker_loc": "座標",
        "marker_name": "マーカー名",
        "marker_text": "説明"
      },
      "member/activity_log": {
        "activity_type": "種別",
        "remote_addr": "リモートアドレス",
        "user_agent": "ユーザーエージェント"
      },
      "member/addon/additional_attributes": {
        "addr": "住所",
        "birthday": "生年月日",
        "in_birth": "生年月日",
        "job": "職種",
        "kana": "氏名（ふりがな）",
        "organization_name": "会社、団体名",
        "postal_code": "郵便番号",
        "sex": "性別",
        "tel": "電話番号"
      },
      "member/addon/blog/blog_setting": {
        "page_limit": "ページ表示件数"
      },
      "member/addon/blog/page_setting": {
        "blog_page_location_ids": "地域設定",
        "blog_page_locations": "地域設定",
        "description": "紹介文",
        "genres": "ジャンル設定",
        "image_id": "サムネイル"
      },
      "member/addon/facebook_oauth": {
        "facebook_client_id": "App ID",
        "facebook_client_secret": "App Secret",
        "facebook_oauth": "OAuth 認証"
      },
      "member/addon/form_auth": {
        "form_auth": "フォーム認証"
      },
      "member/addon/github_oauth": {
        "github_client_id": "Client ID",
        "github_client_secret": "Client Secret",
        "github_oauth": "OAuth 認証"
      },
      "member/addon/google_oauth": {
        "google_oauth2_client_id": "クライアントID",
        "google_oauth2_client_secret": "クライアントシークレット",
        "google_oauth2_oauth": "OAuth 認証"
      },
      "member/addon/group_invitation_setting": {
        "group_invitation_signature": "署名",
        "group_invitation_subject": "件名",
        "group_invitation_template": "メールテンプレート"
      },
      "member/addon/login_link": {
        "login_link_url": "ログインURL"
      },
      "member/addon/member_invitation_setting": {
        "member_invitation_signature": "署名",
        "member_invitation_subject": "件名",
        "member_invitation_template": "メールテンプレート",
        "member_joins_to_invited_group": "招待グループへの参加"
      },
      "member/addon/photo/license": {
        "license_name": "ライセンス"
      },
      "member/addon/photo/license_setting": {
        "license_free": "誰でも利用可",
        "license_not_free": "許可が必要"
      },
      "member/addon/photo/slide": {
        "node_url": "フォトフォルダーURL"
      },
      "member/addon/redirection": {
        "redirect_url": "リダイレクトURL"
      },
      "member/addon/registration/completed": {
        "completed_lower_text": "下部確認テキスト",
        "completed_subject": "件名",
        "completed_upper_text": "上部確認テキスト"
      },
      "member/addon/registration/confirmation": {
        "confirm_personal_data_html": "個人情報保護HTML",
        "confirm_personal_data_state": "個人情報保護状態",
        "footer_html": "フッターHTML",
        "header_html": "ヘッダーHTML"
      },
      "member/addon/registration/notice": {
        "notice_email": "通知メールアドレス",
        "notice_state": "通知設定"
      },
      "member/addon/registration/reply": {
        "reply_lower_text": "下部確認テキスト",
        "reply_subject": "件名",
        "reply_upper_text": "上部確認テキスト"
      },
      "member/addon/registration/required_fields": {
        "addr_required": "住所",
        "birthday_required": "生年月日",
        "job_required": "職種",
        "kana_required": "氏名（ふりがな）",
        "organization_name_required": "会社、団体名",
        "postal_code_required": "郵便番号",
        "sex_required": "性別",
        "tel_required": "電話番号"
      },
      "member/addon/registration/reset_password": {
        "reset_password_lower_text": "下部確認テキスト",
        "reset_password_subject": "件名",
        "reset_password_upper_text": "上部確認テキスト"
      },
      "member/addon/registration/sender_address": {
        "sender_email": "送信メールアドレス",
        "sender_name": "送信者名",
        "sender_signature": "署名"
      },
      "member/addon/twitter_oauth": {
        "twitter_client_id": "Consumer Key",
        "twitter_client_secret": "Consumer Secret",
        "twitter_oauth": "OAuth 認証"
      },
      "member/addon/yahoo_jp_oauth": {
        "yahoojp_client_id": "アプリケーションID",
        "yahoojp_client_secret": "シークレット",
        "yahoojp_oauth": "OAuth 認証"
      },
      "member/addon/yahoo_jp_oauth_v2": {
        "yahoojp_v2_client_id": "アプリケーションID",
        "yahoojp_v2_client_secret": "シークレット",
        "yahoojp_v2_oauth": "OAuth 認証"
      },
      "member/blog_page": {
        "blog_page_locations": "地域",
        "body": "本文",
        "genres": "ジャンル",
        "name": "タイトル"
      },
      "member/group": {
        "in_admin_member_ids": "管理者",
        "invitation_message": "招待メッセージ",
        "members": "メンバー",
        "name": "グループ名"
      },
      "member/group_member": {
        "member_id": "メンバー",
        "state": "状態"
      },
      "member/node/blog_page": {
        "basename": "ブログURL",
        "filename": "ブログURL",
        "foldername": "フォルダー名",
        "layout": "レイアウト",
        "title": "ブログタイトル"
      },
      "member/photo": {
        "caption": "キャプション",
        "contributor": "投稿者",
        "image": "画像",
        "image_id": "画像",
        "keyword": "キーワード",
        "listable_state": "一覧及び検索結果への表示",
        "map_points": "地図",
        "photo_categories": "カテゴリ",
        "photo_locations": "地域",
        "slide_order": "スライド並び順",
        "slideable_state": "スライドへの表示"
      },
      "opendata/addon/app_page_setting": {
        "show_point": "ポイント表示",
        "show_tabs": "タブ表示"
      },
      "opendata/addon/area": {
        "area_ids": "地域"
      },
      "opendata/addon/category": {
        "category_ids": "分野"
      },
      "opendata/addon/category_setting": {
        "categories_limit": "分野数の上限",
        "st_category_ids": "分野"
      },
      "opendata/addon/cms_ref/attachment_file": {
        "assoc_filename": "連携ファイル",
        "assoc_method": "連携確認方法",
        "assoc_node_id": "連携フォルダー",
        "assoc_page_id": "連携ページ",
        "assoc_site_id": "連携サイト"
      },
      "opendata/addon/cms_ref/page": {
        "assoc_method": "連携確認方法",
        "assoc_node_id": "連携フォルダー",
        "assoc_page_id": "連携ページ",
        "assoc_site_id": "連携サイト"
      },
      "opendata/addon/counter_html": {
        "html": "HTML"
      },
      "opendata/addon/dataset_page_setting": {
        "show_point": "ポイント表示",
        "show_tabs": "タブ表示"
      },
      "opendata/addon/estat_category_setting": {
        "estat_categories_limit": "eStat分野数の上限",
        "st_estat_category_ids": "eStat分野"
      },
      "opendata/addon/harvest/importer_area_setting": {
        "default_area_ids": "既定の地域"
      },
      "opendata/addon/harvest/importer_category_setting": {
        "category_settings": "コンバート設定",
        "default_category_ids": "既定の分野"
      },
      "opendata/addon/harvest/importer_estat_category_setting": {
        "category_settings": "コンバート設定",
        "default_estat_category_ids": "既定のeStat分野"
      },
      "opendata/addon/harvest/license": {
        "uid": "ライセンスID"
      },
      "opendata/addon/idea_page_setting": {
        "show_point": "ポイント表示",
        "show_tabs": "タブ表示"
      },
      "opendata/addon/list_node_setting": {
        "limit": "表示件数"
      },
      "opendata/addon/pref_code": {
        "pref_code": "コード"
      },
      "opendata/addon/rdf_store": {
        "rdf_error": "RDF登録エラー",
        "rdf_iri": "グラフ名"
      },
      "opendata/addon/site_setting": {
        "app_state": "アプリ",
        "app_workflow_route": "アプリ承認",
        "dataset_state": "データセット",
        "dataset_workflow_route": "データセット承認",
        "idea_state": "アイデア",
        "idea_workflow_route": "アイデア承認"
      },
      "opendata/addon/update_plan": {
        "update_plan": "更新頻度",
        "update_plan_date": "更新予定日",
        "update_plan_mail_state": "更新予定日のメール通知"
      },
      "opendata/addon/url_rdf_store": {
        "rdf_error": "RDF登録エラー",
        "rdf_iri": "グラフ名"
      },
      "opendata/addon/workflow/idea_comment_approver": {
        "approver_comment": "承認者コメント",
        "comment": "差し戻しコメント",
        "workflow_approvers": "承認者",
        "workflow_comment": "申請コメント",
        "workflow_required_counts": "必要承認数",
        "workflow_state": "承認状態",
        "workflow_user_id": "申請者"
      },
      "opendata/app": {
        "appfiles": "アプリファイル",
        "appurl": "公開URL",
        "area_ids": "地域",
        "category_ids": "分野",
        "dataset_ids": "関連データセット",
        "executed": "実行回数",
        "group_id": "所属グループ",
        "license": "ライセンス",
        "name": "アプリ名",
        "point": "評価",
        "site_id": "サイト",
        "tags": "タグ",
        "text": "説明",
        "user_id": "アプリ作成者"
      },
      "opendata/appfile": {
        "file_id": "ファイル",
        "in_file": "ファイル",
        "name": "アプリファイル名",
        "text": "説明"
      },
      "opendata/csv2rdf_setting": {
        "class": "RDFクラス",
        "column_types": "列設定",
        "dataset": "データセット",
        "header_labels": "タイトル",
        "header_rows": "タイトル行数"
      },
      "opendata/dataset": {
        "api_state": "API",
        "area_ids": "地域",
        "category_ids": "分野",
        "creator_name": "データ作成者",
        "dataset_group_ids": "グループ",
        "downloaded": "合計ダウンロード数",
        "estat_category_ids": "eStat分野",
        "false": false,
        "group_id": "所属グループ",
        "harvest_ckan_groups": "CKANグループ",
        "harvest_ckan_tags": "CKANタグ",
        "harvest_shirasagi_areas": "SHIRASAGI地域",
        "harvest_shirasagi_categories": "SHIRASAGI分野",
        "harvest_text_index": "テキストインデックス",
        "last_updated": "最終更新日時",
        "license": "ライセンス",
        "name": "データセット名",
        "point": "評価",
        "resources": "リソース",
        "site_id": "サイト",
        "tags": "タグ",
        "text": "説明",
        "updated_date": "更新日",
        "user_id": "データ作成者"
      },
      "opendata/dataset_group": {
        "name": "グループ名"
      },
      "opendata/harvest/exporter": {
        "api_key": "APIキー",
        "api_type": "API",
        "name": "名前",
        "order": "並び順",
        "url": "URL"
      },
      "opendata/harvest/exporter/group_setting": {
        "category_ids": "分野",
        "ckan_id": "CKAN ID",
        "ckan_name": "CKAN NAME",
        "estat_category_ids": "eStat分野",
        "name": "名前",
        "order": "並び順"
      },
      "opendata/harvest/exporter/owner_org_setting": {
        "ckan_id": "CKAN ID",
        "group_ids": "グループ",
        "name": "名前",
        "order": "並び順"
      },
      "opendata/harvest/importer": {
        "api_type": "API",
        "basicauth_password": "Basic認証パスワード",
        "basicauth_state": "Basic認証",
        "basicauth_username": "Basic認証ユーザー名",
        "name": "名前",
        "order": "並び順",
        "resource_size_limit_mb": "最大リソースサイズ",
        "source_url": "URL",
        "state": "ステータス"
      },
      "opendata/harvest/importer/category_setting": {
        "category_filename": "分野ファイル名",
        "category_name": "分野名",
        "id": "ID",
        "operator": "操作",
        "order": "並び順",
        "type": "タイプ",
        "value": "値"
      },
      "opendata/harvest/importer/estat_category_setting": {
        "category_filename": "分野ファイル名",
        "category_name": "分野名",
        "id": "ID",
        "operator": "操作",
        "order": "並び順",
        "type": "タイプ",
        "value": "値"
      },
      "opendata/harvest/importer/report": {
        "area_ids": "地域",
        "category_ids": "分野",
        "dataset_name": "データセット名",
        "dataset_no": "データセットNo",
        "estat_category_ids": "eStat分野",
        "false": false,
        "name": "レポート",
        "resouce_name": "リソース名",
        "resouce_no": "リソースNo"
      },
      "opendata/harvest/importer/report_dataset": {
        "imported": "インポート",
        "imported_attributes": "属性"
      },
      "opendata/idea": {
        "app_id": "関連アプリ",
        "comment_body": "本文",
        "commented": "合計コメント数",
        "data": "データ",
        "dataset_id": "関連データセット",
        "issue": "課題",
        "name": "タイトル",
        "note": "備考",
        "point": "評価",
        "request_comment": "未承認コメント",
        "site_id": "サイト",
        "tags": "タグ",
        "text": "アイデア",
        "user_id": "作成者"
      },
      "opendata/idea_comment": {
        "deleted": "削除日時",
        "member_name": "投稿者名",
        "text": "コメント"
      },
      "opendata/license": {
        "default_state": "既定",
        "file_id": "ライセンス画像",
        "in_file": "ファイル",
        "name": "ライセンス名",
        "order": "並び順",
        "related_url": "関連URL"
      },
      "opendata/member": {
        "icon_id": "アイコン画像"
      },
      "opendata/resource": {
        "content": "データの内容",
        "file_id": "ファイル",
        "format": "フォーマット",
        "in_file": "ファイル",
        "license_id": "ライセンス",
        "name": "リソース名",
        "order": "並び順",
        "size": "サイズ",
        "source_url": "リソースURL",
        "text": "説明",
        "tsv_id": "プレビュー用データ"
      },
      "opendata/url_resource": {
        "content": "クローリングデータの内容",
        "crawl_state": "ステータス",
        "crawl_update": "更新方法",
        "file_id": "クローリングファイル",
        "format": "フォーマット",
        "in_file": "クローリングファイル",
        "license_id": "ライセンス",
        "name": "リソース名",
        "original_updated": "元ファイル更新日時",
        "original_url": "URL",
        "size": "サイズ",
        "text": "説明",
        "tsv_id": "プレビュー"
      },
      "rdf/class": {
        "properties": "プロパティ",
        "property_cardinality": "許容回数",
        "property_class": "型",
        "property_comment": "説明",
        "property_property": "名称",
        "sub_class": "継承"
      },
      "rdf/object": {
        "comment": "説明",
        "comments": "説明",
        "equivalent": "同型",
        "label_en": "名称(英語)",
        "label_ja": "名称(日本語)",
        "labels": "名称",
        "name": "名前",
        "vocab": "語彙"
      },
      "rdf/prop": {
        "classes": "定義域",
        "range": "値域"
      },
      "rdf/vocab": {
        "comments": "説明",
        "creator_homepage": "ホームページ",
        "creator_name_en": "作成者(英語)",
        "creator_name_ja": "作成者(日本語)",
        "creators": "作成者",
        "label": "名称",
        "label_en": "名称(英語)",
        "label_ja": "名称(日本語)",
        "labels": "名称",
        "license": "ライセンス",
        "order": "並び順",
        "owner": "所有者",
        "prefix": "プレフィックス",
        "published": "日時",
        "uri": "URI",
        "version": "バージョン"
      },
      "recommend/addon/content_list": {
        "exclude_paths": "除外パス"
      },
      "rss/addon/anpi_mail_setting": {
        "anpi_mail": "安否メール",
        "earthquake_intensity": "震度",
        "loop_mail_text": "ループメール",
        "lower_mail_text": "下部メール",
        "my_anpi_post": "安否掲示板",
        "target_regions": "対象地域",
        "title_mail_text": "メール件名",
        "upper_mail_text": "上部メール"
      },
      "rss/addon/import": {
        "page_state": "ページステータス",
        "rss_max_docs": "最大保存件数",
        "rss_refresh_method": "更新方法",
        "rss_url": "RSS配信URL"
      },
      "rss/addon/page/body": {
        "authors": "作成者",
        "html": "本文",
        "rss_link": "ソースURL"
      },
      "rss/addon/page/weather_xml": {
        "event_id": "イベントID",
        "xml": "XML"
      },
      "rss/addon/pub_sub_hubbub": {
        "callback_url": "Callback URL",
        "hub_url": "Hub URL",
        "lease_seconds": "Lease秒",
        "page_state": "ページステータス",
        "rss_max_docs": "最大保存件数",
        "secret": "HMAC Key",
        "topic_urls": "Topic URL"
      },
      "rss/node/page": null,
      "rss/page": null,
      "service/account": {
        "account": "アカウントID",
        "account_expiration_date": "有効期限（終了）",
        "account_start_date": "有効期限（開始）",
        "base_quota_used": "標準機能使用容量",
        "cms_quota": "CMS容量制限",
        "cms_quota_used": "CMS使用容量",
        "cms_use": "CMSの利用",
        "gws_quota": "グループウェア容量制限",
        "gws_quota_used": "グループウェア使用容量",
        "gws_use": "グループウェアの利用",
        "in_account": "アカウントID",
        "in_cms_quota_mb": "CMS容量制限",
        "in_gws_quota_mb": "グループウェア容量制限",
        "in_password": "パスワード",
        "in_webmail_quota_mb": "ウェブメール容量制限",
        "last_loggedin": "最終ログイン日時",
        "name": "アカウント名",
        "organization_ids": "組織",
        "password": "パスワード",
        "remark": "備考",
        "roles": "ロール",
        "site_ids": "サイト",
        "webmail_quota": "ウェブメール容量制限",
        "webmail_quota_used": "ウェブメール使用容量",
        "webmail_use": "ウェブメールの利用"
      },
      "sitemap/addon/body": {
        "sitemap_deny_urls": "除外URL",
        "sitemap_depth": "表示階層数",
        "sitemap_export_urls": "URLリスト出力",
        "sitemap_page_state": "ページの表示",
        "sitemap_urls": "URLリスト"
      },
      "ss/addon/approve_setting": {
        "close_confirmation": "非公開保存の警告表示設定",
        "forced_update": "メールアドレス注意設定"
      },
      "ss/addon/body": {
        "html": "本文"
      },
      "ss/addon/elasticsearch/site_setting": {
        "elasticsearch_deny": "除外パス",
        "elasticsearch_hosts": "全文検索サーバー"
      },
      "ss/addon/facebook_setting": {
        "facebook_app_id": "App ID",
        "facebook_page_url": "ページURL",
        "opengraph_defaul_image_url": "既定の画像URL",
        "opengraph_type": "OpenGraph"
      },
      "ss/addon/file_setting": {
        "file_resizing": "添付ファイルリサイズ",
        "file_resizing_height": "高さ",
        "file_resizing_label": "%{size}（サイト設定）",
        "file_resizing_width": "幅",
        "multibyte_filename_state": "日本語ファイル名"
      },
      "ss/addon/kana_setting": {
        "kana_format": "ふりがなの形式"
      },
      "ss/addon/map_setting": {
        "map_api": "地図API",
        "map_api_key": "APIキー"
      },
      "ss/addon/markdown": {
        "html": "内容",
        "text": "内容",
        "text_type": "内容形式"
      },
      "ss/addon/mobile_setting": {
        "mobile_css": "CSS",
        "mobile_location": "ロケーション",
        "mobile_size": "１ページの最大サイズ",
        "mobile_state": "状態"
      },
      "ss/addon/notification/reply": {
        "reply_item_id": "返信ID",
        "reply_model": "返信モデル名",
        "reply_module": "返信モジュール名"
      },
      "ss/addon/site_auto_post_setting": {
        "site_edit_auto_post": "編集時に自動投稿",
        "site_sns_auto_delete": "非公開時に投稿を削除",
        "site_twitter_auto_post": "Twitter自動投稿"
      },
      "ss/addon/trash_setting": {
        "trash_threshold": "ゴミ箱保持期間",
        "trash_threshold_unit": "ゴミ箱保持期間単位"
      },
      "ss/addon/twitter_setting": {
        "twitter_access_token": "アクセストークン",
        "twitter_access_token_secret": "トークンシークレット",
        "twitter_card": "カード形式",
        "twitter_consumer_key": "コンシューマーキー",
        "twitter_consumer_secret": "コンシューマーシークレット",
        "twitter_default_image_url": "既定の画像URL",
        "twitter_username": "ユーザー名"
      },
      "ss/document": {
        "basename": "ファイル名",
        "created": "作成日時",
        "deleted": "削除日時",
        "filename": "ファイル名",
        "filepath": "ファイルパス",
        "id": "id",
        "layout_id": "レイアウト",
        "limit": "表示件数",
        "shortcut": "ショートカット",
        "sort": "並び順",
        "state": "ステータス",
        "text_index": "全文検索インデックス(未使用)",
        "updated": "更新日時",
        "view_state": "状態"
      },
      "ss/model/address": {
        "company": "会社",
        "email": "メールアドレス",
        "home_city": "市区町村（自宅）",
        "home_fax": "ファックス番号（自宅）",
        "home_postal_code": "郵便番号（自宅）",
        "home_prefecture": "都道府県（自宅）",
        "home_street_address": "番地（自宅）",
        "home_tel": "電話番号（自宅）",
        "kana": "カナ",
        "member_id": "ユーザー",
        "memo": "メモ",
        "name": "氏名",
        "office_city": "市区町村（勤務先）",
        "office_fax": "ファックス番号（勤務先）",
        "office_postal_code": "郵便番号（勤務先）",
        "office_prefecture": "都道府県（勤務先）",
        "office_street_address": "番地（勤務先）",
        "office_tel": "電話番号（勤務先）",
        "personal_webpage": "WEBページ",
        "tel": "携帯電話番号",
        "title": "役職"
      },
      "ss/model/editor_setting": {
        "color_button": "文字色変更ボタン",
        "editor_css_path": "スタイルシートパス",
        "syntax_check": "アクセシビリティチェック"
      },
      "ss/model/file": {
        "content_type": "コンテンツタイプ",
        "download": "ダウンロード",
        "filename": "ファイル名（英数）",
        "geo_location": "緯度・経度",
        "image": "画像",
        "in_file": "ファイル",
        "in_files": "ファイル",
        "model": "モデル",
        "name": "ファイル名",
        "resizing": "リサイズ",
        "size": "ファイルサイズ",
        "state": "状態"
      },
      "ss/model/group": {
        "activation_date": "有効期限（開始）",
        "domains": "ドメイン",
        "expiration_date": "有効期限（終了）",
        "name": "グループ名",
        "order": "表示順"
      },
      "ss/model/job_log": {
        "args": "パラメータ",
        "class_name": "ジョブ名",
        "closed": "終了日時",
        "job_id": "ジョブID",
        "logs": "ログ",
        "save_term": "保存期間",
        "started": "開始日時",
        "state": "状態"
      },
      "ss/model/mail_setting": {
        "mail_signature": "署名",
        "sender_email": "差出人メールアドレス",
        "sender_name": "差出人名",
        "sender_user_id": "差出ユーザー"
      },
      "ss/model/max_file_size": {
        "extensions": "拡張子",
        "name": "名前",
        "order": "並び順",
        "size": "制限サイズ",
        "state": "状態"
      },
      "ss/model/notification": {
        "export": "エクスポート",
        "format": "フォーマット",
        "group_id": "グループ",
        "html": "本文HTML",
        "member_ids": "参加者",
        "seen": "既読日時",
        "send_date": "送信日時",
        "subject": "件名",
        "text": "本文TEXT",
        "url": "URL"
      },
      "ss/model/postal_code": {
        "city": "区市町村",
        "city_kana": "区市町村（カナ）",
        "code": "郵便番号",
        "prefecture": "都道府県",
        "prefecture_code": "都道府県コード",
        "prefecture_kana": "都道府県（カナ）",
        "town": "町名",
        "town_kana": "町名（カナ）"
      },
      "ss/model/prefecture_code": {
        "city": "市区町村名",
        "city_kana": "市区町村名（カナ）",
        "code": "都道府県又は市区町村コード",
        "prefecture": "都道府県名",
        "prefecture_kana": "都道府県名（カナ）"
      },
      "ss/model/reference/user_titles": {
        "title_ids": "役職",
        "title_orders": "役職並び順"
      },
      "ss/model/role": {
        "name": "ロール名",
        "permission_level": "権限レベル",
        "permissions": "権限設定"
      },
      "ss/model/site": {
        "domains": "ドメイン",
        "domains_with_subdir": "サブディレクトリを含めたドメイン",
        "group_ids": "グループ",
        "host": "ホスト名",
        "https": "HTTPS",
        "mypage_domain": "マイページドメイン",
        "mypage_scheme": "マイページスキーム",
        "name": "サイト名",
        "parent_id": "親サイト",
        "subdir": "サブディレクトリ"
      },
      "ss/model/task": {
        "closed": "終了日時",
        "current_count": "処理件数",
        "interrupt": "中止命令",
        "logs": "ログ",
        "name": "タスク名",
        "site_id": "サイト",
        "started": "開始日時",
        "total_count": "全体件数"
      },
      "ss/model/user": {
        "account_expiration_date": "有効期限（終了）",
        "account_start_date": "有効期限（開始）",
        "address": "メールアドレス",
        "cms_role_ids": "CMSロール",
        "cms_roles": "CMSロール",
        "email": "メールアドレス",
        "from": "名前",
        "group_ids": "グループ",
        "groups": "グループ",
        "gws_role_ids": "GWSロール",
        "gws_roles": "GWSロール",
        "imap_account": "IMAP/ユーザー名",
        "imap_alias": "転送先メールアドレス",
        "imap_auth_type": "IMAP/認証方式",
        "imap_draft_box": "下書きフォルダー",
        "imap_host": "IMAP/ホスト",
        "imap_password": "IMAP/パスワード",
        "imap_port": "IMAP/ポート",
        "imap_sent_box": "送信済みフォルダー",
        "imap_setting_name": "アカウント名",
        "imap_ssl_use": "IMAP/SSL",
        "imap_trash_box": "ゴミ箱フォルダー",
        "in_imap_password": "IMAP/パスワード",
        "in_password": "パスワード",
        "in_title_id": "役職",
        "initial_password_warning": "初期パスワード警告",
        "kana": "カナ",
        "last_loggedin": "最終ログイン日時",
        "ldap": "LDAPユーザー",
        "lock_state": "利用状態",
        "login_roles": "ログイン種別",
        "name": "氏名",
        "organization_id": "所属組織",
        "organization_uid": "職員番号",
        "password": "パスワード",
        "remark": "備考",
        "restriction": "利用制限",
        "session_lifetime": "セッション寿命",
        "sns": "SNSユーザー",
        "switch_user_id": "切り替えユーザー",
        "sys_role_ids": "SYSロール",
        "sys_roles": "SYSロール",
        "tel": "電話番号",
        "tel_ext": "内線番号",
        "tel_ext_short": "内線",
        "threshold_mb": "警告表示",
        "type": "ユーザータイプ",
        "uid": "ユーザーID",
        "webmail_role_ids": "WEBMAILロール",
        "webmail_roles": "WEBMAILロール"
      },
      "ss/model/user_title": {
        "activation_date": "有効期限（開始）",
        "code": "役職コード",
        "expiration_date": "有効期限（終了）",
        "group_id": "グループ",
        "name": "役職名",
        "order": "並び順",
        "remark": "備考"
      },
      "ss/reference/site": {
        "site_id": "サイト"
      },
      "ss/reference/user": {
        "user_id": "ユーザー"
      },
      "ss/thumb_file": {
        "image_size": "画像サイズ",
        "image_size_name": "画像サイズ名",
        "original_id": "元画像ID",
        "thumb_height": "高さ",
        "thumb_width": "幅"
      },
      "ss/user_group_history": {
        "cms_site_id": "CMSサイト",
        "created": "異動日時",
        "group_ids": "グループ",
        "gws_site_id": "GWSサイト",
        "user_id": "ユーザー"
      },
      "sys/ad": {
        "time": "画像切り替え時間",
        "width": "横幅"
      },
      "sys/addon/environment_setting": {
        "keys": "キー"
      },
      "sys/addon/open_id_connect_setting": {
        "auth_url": "Auth URL",
        "claims": "Claim",
        "client_id": "Client ID",
        "client_secret": "Client Secret",
        "in_discovery_file": "Discovery File",
        "issuer": "Issuer",
        "jwks_uri": "JWKS Uri",
        "max_age": "Max Age",
        "response_mode": "Response Mode",
        "response_type": "Response Type",
        "scopes": "Scope",
        "token_url": "Token URL"
      },
      "sys/addon/role": {
        "sys_role_ids": "ロール"
      },
      "sys/addon/saml_setting": {
        "entity_id": "Entity ID",
        "force_authn_state": "再認証",
        "identifier": "Identifier",
        "metadata": "メタデータ",
        "name_id_format": "Name ID Format",
        "slo_url": "SLO Url",
        "sso_url": "SSO Url",
        "x509_cert": "X509公開鍵証明書"
      },
      "sys/mail_log": {
        "bcc": "Bcc",
        "cc": "Cc",
        "error": "エラー",
        "from": "差出人",
        "mail": "内容",
        "subject": "件名",
        "to": "宛先"
      },
      "sys/model/auth": {
        "filename": "ファイル名",
        "name": "名前",
        "order": "並び順",
        "state": "ステータス",
        "text": "説明"
      },
      "sys/notice": {
        "html": "本文",
        "name": "お知らせ見出し",
        "notice_severity": "種別",
        "notice_target": "表示場所"
      },
      "sys/password_policy": {
        "password_limit_days": "有効日数",
        "password_limit_use": "有効日数の使用",
        "password_max_failure_count": "最大失敗回数",
        "password_max_failure_use": "最大失敗回数の使用",
        "password_min_change_char_count": "相違数",
        "password_min_change_char_use": "相違数の使用",
        "password_min_digit_length": "数字",
        "password_min_digit_use": "数字の最低文字数の使用",
        "password_min_downcase_length": "英小文字",
        "password_min_downcase_use": "英小文字の最低文字数の使用",
        "password_min_length": "最低文字数",
        "password_min_symbol_length": "記号",
        "password_min_symbol_use": "記号の最低文字数の使用",
        "password_min_upcase_length": "英大文字",
        "password_min_upcase_use": "英大文字の最低文字数の使用",
        "password_min_use": "最低文字数の使用",
        "password_prohibited_char": "使用禁止文字",
        "password_prohibited_char_use": "使用禁止文字の使用",
        "password_warning_days": "有効期限切れ警告",
        "password_warning_use": "有効期限切れ警告の使用"
      },
      "sys/setting": {
        "menu_connection_state": "接続情報",
        "menu_file_state": "ファイル"
      },
      "sys/site_copy_task": {
        "copy_contents": "複製する項目",
        "source_site_id": "複製するサイト",
        "target_host_domains": "ドメイン",
        "target_host_host": "ホスト名",
        "target_host_name": "サイト名"
      },
      "urgency/addon/layout": {
        "urgency_default_layout_id": "通常時レイアウト",
        "urgency_mail_page_layout_id": "メール取込レイアウト"
      },
      "urgency/addon/mail_page": {
        "urgency_node_id": "フォルダー",
        "urgency_state": "切り替え"
      },
      "voice/file": {
        "error": "エラー",
        "last_modified": "URLの最終更新日時",
        "play": "再生",
        "updated": "作成日時",
        "url": "URL"
      },
      "voice/lockable": {
        "lock_until": "ロック期限日時"
      },
      "webmail/addon/group_extension": {
        "address": "メールアドレス",
        "from": "名前",
        "imap_account": "IMAP/ユーザー名",
        "imap_auth_type": "IMAP/認証方式",
        "imap_draft_box": "下書きフォルダー",
        "imap_host": "IMAP/ホスト",
        "imap_password": "IMAP/パスワード",
        "imap_port": "IMAP/ポート",
        "imap_sent_box": "送信済みフォルダー",
        "imap_setting_name": "アカウント名",
        "imap_ssl_use": "IMAP/SSL",
        "imap_trash_box": "ゴミ箱フォルダー",
        "in_imap_password": "IMAP/パスワード",
        "threshold_mb": "警告表示"
      },
      "webmail/address": {
        "address_group_id": "グループ名",
        "import_format": "インポート形式"
      },
      "webmail/address_group": {
        "name": "グループ名",
        "order": "並び順"
      },
      "webmail/filter": {
        "action": "アクション",
        "conditions": "検索条件",
        "conditions/field": "フィールド",
        "conditions/operator": "判定",
        "conditions/value": "値",
        "conjunction": "検索条件の接続",
        "filter_error_at": "エラー日時",
        "filter_errors": "エラー内容",
        "mailbox": "フォルダー",
        "name": "フィルター名",
        "order": "並び順"
      },
      "webmail/history": {
        "action": "アクション",
        "controller": "コントローラー",
        "controller_name": "コントローラー名",
        "created": "変更日時",
        "item_id": "項目ID",
        "job": "ジョブ",
        "job_name": "ジョブ名",
        "message": "メッセージ",
        "mode": "区分",
        "mode_name": "区分名",
        "model": "モデル",
        "model_name": "モデル名",
        "name": "名称",
        "path": "URL",
        "request_id": "リクエストID",
        "session_id": "セッションID",
        "severity": "重要度",
        "updated_field_names": "変更箇所",
        "updated_fields": "変更箇所",
        "user_name": "ユーザー"
      },
      "webmail/mail": {
        "all_export": "対象",
        "attachments": "添付ファイル",
        "bcc": "BCC",
        "body": "本文",
        "cc": "CC",
        "date": "日付",
        "flagged": "スター付き",
        "flags": "フラグ",
        "from": "差出人",
        "in_reply_to": "返信先",
        "internal_date": "送信日時",
        "mail_ids": "メール",
        "reply_to": "返信先",
        "sender": "差出人",
        "size": "サイズ",
        "subject": "件名",
        "to": "宛先",
        "unseen": "未読"
      },
      "webmail/mailbox": {
        "name": "フォルダー名",
        "original_name": "フォルダー名(UTF-7)",
        "parent_name": "親フォルダー"
      },
      "webmail/reference/role": {
        "webmail_role_ids": "ロール"
      },
      "webmail/signature": {
        "default": "既定の署名",
        "name": "名称",
        "text": "本文"
      },
      "webmail/user": {
        "account_index": "アカウント番号",
        "in_file": "ファイル"
      },
      "webmail/user_extension": {
        "imap_default_index": "IMAP/既定アカウント",
        "imap_settings": "IMAP/ユーザー設定"
      },
      "workflow/addon/approver": {
        "approved": "承認日時",
        "approver_comment": "承認者コメント",
        "comment": "差し戻しコメント",
        "workflow_approvers": "承認者",
        "workflow_circulations": "回覧者",
        "workflow_comment": "申請コメント",
        "workflow_on_remand": "差し戻し時",
        "workflow_pull_up": "引き上げ承認",
        "workflow_required_counts": "必要承認数",
        "workflow_state": "承認状態",
        "workflow_user_id": "申請者"
      },
      "workflow/model/route": {
        "approver_at": "%{level} 段目の承認者",
        "approver_attachment_uses": "承認者によるファイル追加",
        "approvers": "承認者",
        "approvers_level": "段",
        "approvers_user_id": "申請者",
        "circulation_attachment_uses": "回覧者によるファイル追加",
        "circulations": "回覧者",
        "group_ids": "グループ",
        "level": "%{level} 段目",
        "my_group": "自所属",
        "name": "名前",
        "on_remand": "差し戻し時",
        "pull_up": "引き上げ承認",
        "required_count_at": "%{level} 段目の必要承認数",
        "required_counts": "必要承認数"
      }
    },
    "errors": {
      "messages": {
        "ambiguous_relationship": {
          "message": "Ambiguous relations %{candidates} defined on %{klass}.",
          "resolution": "On the %{name} relation on %{inverse} you must add an :inverse_of option to specify the exact relationship on %{klass} that is the opposite of %{name}.",
          "summary": "When Mongoid attempts to set an inverse document of a relation in memory, it needs to know which relation it belongs to. When setting %{name}, Mongoid looked on the class %{inverse} for a matching relation, but multiples were found that could potentially match: %{candidates}."
        },
        "blank_in_locale": "can't be blank in %{location}",
        "callbacks": {
          "message": "Calling %{method} on %{klass} resulted in a false return from a callback.",
          "resolution": "Double check all before callbacks to make sure they are not unintentionally returning false.",
          "summary": "If a before callback returns false when using Document.create!, Document#save!, or Document#update_attributes! this error will get raised since the document did not actually get saved."
        },
        "calling_document_find_with_nil_is_invalid": {
          "message": "Calling Document.find with nil is invalid.",
          "resolution": "Most likely this is caused by passing parameters directly through to the find, and the parameter either is not present or the key from which it is accessed is incorrect.",
          "summary": "Document.find expects the parameters to be 1 or more ids, and will return a single document if 1 id is provided, otherwise an array of documents if multiple ids are provided."
        },
        "delete_restriction": {
          "message": "Cannot delete %{document} because of dependent '%{relation}'.",
          "resolution": "Don't attempt to delete the parent %{document} when it has children, or change the dependent option on the relation.",
          "summary": "When defining '%{relation}' with a :dependent => :restrict, Mongoid will raise an error when attempting to delete the %{document} when the child '%{relation}' still has documents in it."
        },
        "document_not_destroyed": {
          "message": "%{klass} with id %{id} was not destroyed.",
          "resolution": "Check the before/after destroy callbacks to ensure that the return values are truthy for the chain to continue.",
          "summary": "When calling %{klass}#destroy! and a callback halts the destroy callback chain by returning a false value, the deletion will not actually occur."
        },
        "document_not_found": {
          "message": "Document(s) not found for class %{klass} with id(s) %{missing}.",
          "resolution": "Search for an id that is in the database or set the Mongoid.raise_not_found_error configuration option to false, which will cause a nil to be returned instead of raising this error when searching for a single id, or only the matched documents when searching for multiples.",
          "summary": "When calling %{klass}.find with an id or array of ids, each parameter must match a document in the database or this error will be raised. The search was for the id(s): %{searched} (%{total} total) and the following ids were not found: %{missing}."
        },
        "document_with_attributes_not_found": {
          "message": "Document not found for class %{klass} with attributes %{attributes}.",
          "resolution": "Search for attributes that are in the database or set the Mongoid.raise_not_found_error configuration option to false, which will cause a nil to be returned instead of raising this error.",
          "summary": "When calling %{klass}.find_by with a hash of attributes, all attributes provided must match a document in the database or this error will be raised."
        },
        "eager_load": {
          "message": "Eager loading :%{name} is not supported since it is a polymorphic belongs_to relation.",
          "resolution": "Don't attempt to perform this action and have patience, maybe this will be supported in the future.",
          "summary": "Mongoid cannot currently determine the classes it needs to eager load when the relation is polymorphic. The parents reside in different collections so a simple id lookup is not sufficient enough."
        },
        "in_memory_collation_not_supported": {
          "message": "A collation option cannot be applied when querying documents in-memory.",
          "resolution": "Remove the collation option from the query.",
          "summary": "The query being run against documents in memory has a collation option set. A collation option is only supported if the query is executed on a MongoDB server with version >= 3.4."
        },
        "invalid_collection": {
          "message": "Access to the collection for %{klass} is not allowed.",
          "resolution": "For access to the collection that the embedded document is in, use %{klass}#_root.collection, or do not attempt to persist an embedded document without a parent set.",
          "summary": "%{klass}.collection was called, and %{klass} is an embedded document - it resides within the collection of the root document of the hierarchy."
        },
        "invalid_config_option": {
          "message": "Invalid configuration option: %{name}.",
          "resolution": "Remove the invalid option or fix the typo. If you were expecting the option to be there, please consult the following page with repect to Mongoid's configuration:\n\n   http://mongoid.org/en/mongoid/docs/installation.html",
          "summary": "A invalid configuration option was provided in your mongoid.yml, or a typo is potentially present. The valid configuration options are: %{options}."
        },
        "invalid_dependent_strategy": {
          "message": "Invalid dependent strategy: %{invalid_strategy}.",
          "resolution": "Change the dependent strategy to one of the valid types.",
          "summary": "An invalid dependent strategy was defined for the association: %{association}. The valid strategies are: %{valid_strategies}."
        },
        "invalid_field": {
          "message": "Defining a field named '%{name}' is not allowed.",
          "resolution": "Use Mongoid.destructive_fields to see what names are not allowed, and don't use these names. These include names that also conflict with core Ruby methods on Object, Module, Enumerable, or included gems that inject methods into these or Mongoid internals.",
          "summary": "Defining this field would override the method '%{name}', which would cause issues with expectations around the original method and cause extremely hard to debug issues. The original method was defined in:\n   Object: %{origin}\n   File: %{file}\n   Line: %{line}"
        },
        "invalid_field_option": {
          "message": "Invalid option :%{option} provided for field :%{name}.",
          "resolution": "When defining the field :%{name} on '%{klass}', please provide valid options for the field. These are currently: %{valid}. If you meant to define a custom field option, please do so first like so:\n\n   Mongoid::Fields.option :%{option} do |model, field, value|\n     # Your logic here...\n   end\n   class %{klass}\n     include Mongoid::Document\n     field :%{name}, %{option}: true\n   end\n\n",
          "summary": "Mongoid requires that you only provide valid options on each field definition in order to prevent unexpected behaviour later on."
        },
        "invalid_includes": {
          "message": "Invalid includes directive: %{klass}.includes(%{args})",
          "resolution": "Ensure that each parameter passed to %{klass}.includes is a valid name of a relation on the %{klass} model. These are: %{relations}.",
          "summary": "Eager loading in Mongoid only supports providing arguments to %{klass}.includes that are the names of relations on the %{klass}."
        },
        "invalid_index": {
          "message": "Invalid index specification on %{klass}: %{spec}, %{options}",
          "resolution": "Ensure that the index conforms to the correct syntax and has the correct options.\n\n Valid options are:\n   background: true|false\n   database: 'database_name'\n   drop_dups: true|false\n   name: 'index_name'\n   sparse: true|false\n   unique: true|false\n   min: 1\n   max: 1\n   bits: 26\n   key: 26\n   bucket_size : 1\n   sphere_version : 1\n   text_version : 1\n   version : 1\n   weights: { content: 1, title: 2 }\n   expire_after_seconds: number_of_seconds\n   partial_filter_expression\n   storage_engine\n   language_override\n   default_language\n   collation\n Valid types are: 1, -1, '2d', '2dsphere', 'geoHaystack', 'text', 'hashed'\n\n Example:\n   class Band\n     include Mongoid::Document\n     index({ name: 1, label: -1 }, { sparse: true })\n     index({ location: '2d' }, { background: true })\n   end\n\n",
          "summary": "Indexes in Mongoid are defined as a hash of field name and direction/2d pairs, with a hash for any additional options."
        },
        "invalid_options": {
          "message": "Invalid option :%{invalid} provided to relation :%{name}.",
          "resolution": "Valid options are: %{valid}, make sure these are the ones you are using.",
          "summary": "Mongoid checks the options that are passed to the relation macros to ensure that no ill side effects occur by letting something slip by."
        },
        "invalid_path": {
          "message": "Having a root path assigned for %{klass} is invalid.",
          "resolution": "Most likely your embedded model, %{klass} is also referenced via a has_many from a root document in another collection. Double check the relation definitions and fix any instances where embedded documents are improperly referenced from other collections.",
          "summary": "Mongoid has two different path objects for determining the location of a document in the database, Root and Embedded. This error is raised when an embedded document somehow gets a root path assigned."
        },
        "invalid_persistence_option": {
          "message": "Invalid persistence option :%{invalid}.",
          "resolution": "Valid options are: %{valid}, make sure these are the ones you are using.",
          "summary": "The options used to change the persistence context must be one of the valid options for a mongo client, or a collection name."
        },
        "invalid_relation": {
          "message": "Defining a relation named '%{name}' is not allowed.",
          "resolution": "Use Mongoid.destructive_fields to see what names are not allowed, and don't use these names. These include names that also conflict with core Ruby methods on Object, Module, Enumerable, or included gems that inject methods into these or Mongoid internals.",
          "summary": "Defining this relation would override the method '%{name}', which would cause issues with expectations around the original method and cause extremely hard to debug issues. The original method was defined in:\n   Object: %{origin}\n   File: %{file}\n   Line: %{line}"
        },
        "invalid_relation_option": {
          "message": "Invalid relation option :%{option} for relation '%{name}' on class %{klass}.",
          "resolution": "Valid options are: %{valid_options}, make sure you use only those.",
          "summary": "An invalid option was provided for a relation."
        },
        "invalid_scope": {
          "message": "Defining a scope of value %{value} on %{klass} is not allowed.",
          "resolution": "Change the scope to be a proc wrapped critera.\n\n Example:\n   class Band\n     include Mongoid::Document\n     scope :inactive, ->{ where(active: false) }\n   end\n\n",
          "summary": "Scopes in Mongoid must be procs that wrap criteria objects."
        },
        "invalid_session_nesting": {
          "message": "A session was started while another session was being used.",
          "resolution": "Only use one session at a time; sessions cannot be nested.",
          "summary": "Sessions cannot be nested. Only one session can be used in a thread at once."
        },
        "invalid_session_use": {
          "message": "A session was attempted to be used with a model whose client cannot use that session.",
          "resolution": "Only execute operations on the model class or instances of the model through which the session was created. Otherwise, ensure that all models on which operations are executed in the session block share the same driver client. For example, a model may have a different client specified in its 'store_in' options.\n\n",
          "summary": "Sessions are started via driver clients (Model#mongo_client) and, in most cases, driver clients are shared across models. When different models have their own clients, a session cannot be obtained via one model and used for operations on another model."
        },
        "invalid_set_polymorphic_relation": {
          "message": "The %{name} attribute can't be set to an instance of %{other_klass} as %{other_klass} has multiple relations referencing %{klass} as %{name}.",
          "resolution": "Set the values from the parent, or redefine the relation with only a single definition in the parent.",
          "summary": "If the parent class of a polymorphic relation has multiple definitions for the same relation, the values must be set from the parent side and not the child side since Mongoid cannot determine from the child side which relation to go in."
        },
        "invalid_storage_options": {
          "message": "Invalid options passed to %{klass}.store_in: %{options}.",
          "resolution": "Change the options passed to store_in to match the documented API, and ensure all keys in the options hash are symbols.\n\n Example:\n   class Band\n     include Mongoid::Document\n     store_in collection: 'artists', database: 'secondary'\n   end\n\n",
          "summary": "The :store_in macro takes only a hash of parameters with the keys :database, :collection, or :client."
        },
        "invalid_storage_parent": {
          "message": "Invalid store_in call on class %{klass}.",
          "resolution": "Remove the store_in call on class %{klass}, as it will use its parent store configuration. Or remove the hierarchy extension for this class.",
          "summary": "The :store_in macro can only be called on a base Mongoid Document"
        },
        "invalid_time": {
          "message": "'%{value}' is not a valid Time.",
          "resolution": "Make sure to pass parsable values to the field setter for Date, DateTime, and Time objects. When this is a String it needs to be valid for Time.parse. Other objects must be valid to pass to Time.local.",
          "summary": "Mongoid tries to serialize the values for Date, DateTime, and Time into proper UTC times to store in the database. The provided value could not be parsed."
        },
        "invalid_value": {
          "message": "Value of type %{value_class} cannot be written to a field of type %{field_class}",
          "resolution": "Verify if the value to be set correspond to field definition",
          "summary": "Tried to set a value of type %{value_class} to a field of type %{field_class}"
        },
        "inverse_not_found": {
          "message": "When adding a(n) %{klass} to %{base}#%{name}, Mongoid could not determine the inverse foreign key to set. The attempted key was '%{inverse}'.",
          "resolution": "If an inverse is not required, like a belongs_to or has_and_belongs_to_many, ensure that :inverse_of => nil is set on the relation. If the inverse is needed, most likely the inverse cannot be figured out from the names of the relations and you will need to explicitly tell Mongoid on the relation what the inverse is.\n\n Example:\n   class Lush\n     include Mongoid::Document\n     has_one :whiskey, class_name: \"Drink\", inverse_of: :alcoholic\n   end\n\n   class Drink\n     include Mongoid::Document\n     belongs_to :alcoholic, class_name: \"Lush\", inverse_of: :whiskey\n   end",
          "summary": "When adding a document to a relation, Mongoid attempts to link the newly added document to the base of the relation in memory, as well as set the foreign key to link them on the database side. In this case Mongoid could not determine what the inverse foreign key was."
        },
        "message_title": "message",
        "mixed_client_configuration": {
          "message": "Both uri and standard configuration options defined for client: '%{name}'.",
          "resolution": "Provide either only a uri as configuration or only standard options.",
          "summary": "Instead of simply giving uri or standard options a preference order, Mongoid assumes that you have made a mistake in your configuration and requires that you provide one or the other, but not both. The options that were provided were: %{config}."
        },
        "mixed_relations": {
          "message": "Referencing a(n) %{embedded} document from the %{root} document via a relational association is not allowed since the %{embedded} is embedded.",
          "resolution": "Consider not embedding %{embedded}, or do the key storage and access in a custom manner in the application code.",
          "summary": "In order to properly access a(n) %{embedded} from %{root} the reference would need to go through the root document of %{embedded}. In a simple case this would require Mongoid to store an extra foreign key for the root, in more complex cases where %{embedded} is multiple levels deep a key would need to be stored for each parent up the hierarchy."
        },
        "nested_attributes_metadata_not_found": {
          "message": "Could not find metadata for relation '%{name}' on model: %{klass}.",
          "resolution": "Make sure that there is a relation defined named '%{name}' on %{klass} or that the relation definition comes before the accepts_nested_attributes_for macro in the model - order matters so that Mongoid has access to the metadata.\n\n Example:\n   class Band\n     include Mongoid::Document\n     has_many :albums\n     accepts_nested_attributes_for :albums\n   end\n\n",
          "summary": "When defining nested attributes for a relation, Mongoid needs to access the metadata for the relation '%{name}' in order if add autosave functionality to it, if applicable. Either no relation named '%{name}' could be found, or the relation had not been defined yet."
        },
        "no_client_config": {
          "message": "No configuration could be found for a client named '%{name}'.",
          "resolution": "Double check your mongoid.yml to make sure under the clients key that a configuration exists for '%{name}'. If you have set the configuration programatically, ensure that '%{name}' exists in the configuration hash.",
          "summary": "When attempting to create the new client, Mongoid could not find a client configuration for the name: '%{name}'. This is necessary in order to know the host, port, and options needed to connect."
        },
        "no_client_database": {
          "message": "No database provided for client configuration: :%{name}.",
          "resolution": "If configuring via a mongoid.yml, ensure that within your :%{name} section a :database value for the client's default database is defined.\n\n Example:\n   development:\n     clients:\n       %{name}:\n         database: my_app_db\n         hosts:\n           - localhost:27017\n\n",
          "summary": "Each client configuration must provide a database so Mongoid knows where the default database to persist to. What was provided was: %{config}."
        },
        "no_client_hosts": {
          "message": "No hosts provided for client configuration: :%{name}.",
          "resolution": "If configuring via a mongoid.yml, ensure that within your :%{name} section a :hosts value for the client hosts is defined.\n\n Example:\n   development:\n     clients:\n       %{name}:\n         database: my_app_db\n         hosts:\n           - localhost:27017\n\n",
          "summary": "Each client configuration must provide hosts so Mongoid knows where the database server is located. What was provided was: %{config}."
        },
        "no_clients_config": {
          "message": "No clients configuration provided.",
          "resolution": "Double check your mongoid.yml to make sure that you have a top-level clients key with at least 1 default client configuration for it. You can regenerate a new mongoid.yml for assistance via `rails g mongoid:config`.\n\n Example:\n   development:\n     clients:\n       default:\n         database: mongoid_dev\n         hosts:\n           - localhost:27017\n\n",
          "summary": "Mongoid's configuration requires that you provide details about each client that can be connected to, and requires in the clients config at least 1 default client to exist."
        },
        "no_default_client": {
          "message": "No default client configuration is defined.",
          "resolution": "If configuring via a mongoid.yml, ensure that within your :clients section a :default client is defined.\n\n Example:\n   development:\n     clients:\n       default:\n         hosts:\n           - localhost:27017\n\n",
          "summary": "The configuration provided settings for: %{keys}, but Mongoid requires a :default to be defined at minimum."
        },
        "no_environment": {
          "message": "Could not load the configuration since no environment was defined.",
          "resolution": "Make sure some environment is set from the mentioned options. Mongoid cannot load configuration from the yaml without knowing which environment it is in, and we have considered defaulting to development an undesireable side effect of this not being defined.",
          "summary": "Mongoid attempted to find the appropriate environment but no Rails.env, Sinatra::Base.environment, RACK_ENV, or MONGOID_ENV could be found."
        },
        "no_map_reduce_output": {
          "message": "No output location was specified for the map/reduce operation.",
          "resolution": "Provide the location that the output of the operation is to go by chaining an #out call to the map/reduce.\n\n Example:\n   Band.map_reduce(map, reduce).out(inline: 1)\n\n Valid options for the out function are:\n   inline:  1\n   merge:   'collection-name'\n   replace: 'collection-name'\n   reduce:  'collection-name'\n\n",
          "summary": "When executing a map/reduce, you must provide the output location of the results. The attempted command was: %{command}."
        },
        "no_metadata": {
          "message": "Metadata not found for document of type %{klass}.",
          "resolution": "Ensure that your relations on the %{klass} model are all properly defined, and that the inverse relations are also properly defined. Embedded relations must have both the parent (embeds_one/embeds_many) and the inverse (embedded_in) present in order to work properly.",
          "summary": "Mongoid sets the metadata of a relation on the document when it is either loaded from within the relation, or added to one. The presence of the metadata is required in order to provide various functionality around relations. Most likely you are getting this error because the document is embedded and was attempted to be persisted without being associated with a parent, or the relation was not properly defined."
        },
        "no_parent": {
          "message": "Cannot persist embedded document %{klass} without a parent document.",
          "resolution": "Ensure that you've set the parent relation if instantiating the embedded document directly, or always create new embedded documents via the parent relation.",
          "summary": "If the document is embedded, in order to be persisted it must always have a reference to its parent document. This is most likely caused by either calling %{klass}.create or %{klass}.create! without setting the parent document as an attribute."
        },
        "readonly_attribute": {
          "message": "Attempted to set the readonly attribute '%{name}' with the value: %{value}.",
          "resolution": "Don't define '%{name}' as readonly, or do not attempt to update its value after the document is persisted.",
          "summary": "Attributes flagged as readonly via Model.attr_readonly can only have values set when the document is a new record."
        },
        "readonly_document": {
          "message": "Attempted to persist the readonly document '%{klass}'.",
          "resolution": "Don't attempt to persist documents that are flagged as readonly.",
          "summary": "Documents loaded from the database using #only cannot be persisted."
        },
        "resolution_title": "resolution",
        "scope_overwrite": {
          "message": "Cannot create scope :%{scope_name}, because of existing method %{model_name}.%{scope_name}.",
          "resolution": "Change the name of the scope so it does not conflict with the already defined method %{model_name}, or set the configuration option Mongoid.scope_overwrite_exception to false, which is its default. In this case a warning will be logged.",
          "summary": "When defining a scope that conflicts with a method that already exists on the model, this error will get raised if Mongoid.scope_overwrite_exception is set to true."
        },
        "sessions_not_supported": {
          "message": "Sessions are not supported by the connected server(s).",
          "resolution": "Verify that all servers in your deployment are at least version 3.6 or don't attempt to use sessions with older server versions.",
          "summary": "A session was attempted to be used with a MongoDB server version that doesn't support sessions. Sessions are supported in MongoDB server versions 3.6 and higher."
        },
        "summary_title": "summary",
        "taken": "is already taken",
        "too_many_nested_attribute_records": {
          "message": "Accepting nested attributes for %{association} is limited to %{limit} records.",
          "resolution": "The limit is set as an option to the macro, for example: accepts_nested_attributes_for :%{association}, limit: %{limit}. Consider raising this limit or making sure no more are sent than the set value.",
          "summary": "More documents were sent to be processed than the allowed limit."
        },
        "unknown_attribute": {
          "message": "Attempted to set a value for '%{name}' which is not allowed on the model %{klass}.",
          "resolution": "You can include Mongoid::Attributes::Dynamic if you expect to be writing values for undefined fields often.",
          "summary": "Without including Mongoid::Attributes::Dynamic in your model and the attribute does not already exist in the attributes hash, attempting to call %{klass}#%{name}= for it is not allowed. This is also triggered by passing the attribute to any method that accepts an attributes hash, and is raised instead of getting a NoMethodError."
        },
        "unknown_model": {
          "message": "Attempted to instantiate an object of the unknown Model '%{klass}'.",
          "resolution": "The _type field is a reserved one used by Mongoid to determine the class for instantiating an object. Please don't save data in this field or ensure that any values in this field correspond to valid Models.",
          "summary": "A document with the value '%{value}' at the key '_type' was used to instantiate a model object but Mongoid cannot find this Class."
        },
        "unsaved_document": {
          "message": "Attempted to save %{document} before the parent %{base}.",
          "resolution": "Make sure to only use create or create! when the parent document %{base} is persisted.",
          "summary": "You cannot call create or create! through the relation (%{document}) whose parent (%{base}) is not already saved. This would cause the database to be out of sync since the child could potentially reference a nonexistent parent."
        },
        "unsupported_javascript": {
          "message": "Executing Javascript $where selector on an embedded criteria is not supported.",
          "resolution": "Please provide a standard hash to #where when the criteria is for an embedded relation.",
          "summary": "Mongoid only supports providing a hash of arguments to #where criterion on embedded documents. Since %{klass} is embedded, the expression %{javascript} is not allowed."
        },
        "validations": {
          "message": "Validation of %{document} failed.",
          "resolution": "Try persisting the document with valid data or remove the validations.",
          "summary": "The following errors were found: %{errors}"
        }
      },
      "models": {
        "chat/intent": {
          "not_found": "%{line_no} 行目: Id %{id} のシナリオは存在しません。"
        },
        "chorg/run_params": {
          "job_mode_is_not_service": "ジョブサービスの実行モードがserviceではないため、予約実行できません。システム管理者にお問い合わせください。"
        },
        "cms/column/value/youtube": {
          "attributes": {
            "url": {
              "youtube_id_can_not_get": "からYouTubeIDが取得できませんでした。"
            }
          }
        },
        "cms/model/node": {
          "routed_folders_under_uploader": "アップローダー下に属性付きフォルダーは作成できません。アップローダーに切り替え、新規フォルダーよりフォルダーを作成してください。"
        },
        "event/page": {
          "invalid_csv_or_ical": "CSV形式のファイルまたはiCal形式のファイルを選択してください。",
          "malformed_csv": "未サポートのCSV形式のファイルです。正しいCSV形式のファイルを選択してください。",
          "malformed_ical": "未サポートのiCal形式のファイルです。正しいiCal形式のファイルを選択してください。"
        },
        "gws/addon/discussion/quota": {
          "file_size_limit": "添付ファイルのサイズ（%{size}）が 最大サイズ（%{limit}）を超えました。",
          "forum_quota_over": "電子会議室の容量制限を超過している為、保存できませんでした。",
          "topic_quota_over": "スレッドの容量制限を超過している為、保存できませんでした。",
          "total_quota_over": "電子会議室の総容量制限を超過している為、保存できませんでした。"
        },
        "gws/addon/portal/portlet/ad_file": {
          "attributes": {
            "ad_files": {
              "too_many_files": "は%{limit}つまで添付することができます。"
            }
          }
        },
        "gws/attendance/time_card": {
          "already_punched": "打刻済みです。"
        },
        "gws/board/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/board/postable": {
          "file_size_exceeds_post_limit": "添付ファイルのサイズ（%{size}）が投稿の最大サイズ（%{limit}）を超えました。",
          "file_size_exceeds_topic_limit": "添付ファイルの合計サイズ（%{size}）がトピックの最大サイズ（%{limit}）を超えました。"
        },
        "gws/circular/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/circular/post": {
          "file_size_limit": "添付ファイルのサイズ（%{size}）が 最大サイズ（%{limit}）を超えました。",
          "member_length": "参加者は%{max}人以下にしてください。"
        },
        "gws/column/base": {
          "not_found": " %{id}は存在しません。"
        },
        "gws/contrast": {
          "load_error": "読み込みに失敗しました。",
          "no_contrasts": "定義がありません。"
        },
        "gws/facility/item": {
          "not_found": "%{line_no}: ID %{id} の設備は存在しません。"
        },
        "gws/faq/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/faq/postable": {
          "file_size_exceeds_post_limit": "添付ファイルのサイズ（%{size}）が投稿の最大サイズ（%{limit}）を超えました。",
          "file_size_exceeds_topic_limit": "添付ファイルの合計サイズ（%{size}）がトピックの最大サイズ（%{limit}）を超えました。"
        },
        "gws/memo/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/memo/folder": {
          "attributes": {
            "in_basename": {
              "invalid_chars_as_name": "には次の文字は使えません: \\ / : * ? \" < > |"
            }
          },
          "found_children": "子フォルダーが存在します。",
          "found_messages": "%{name}にメールが存在します。",
          "included_memo": "メッセージが入っているフォルダーは削除できません。",
          "not_found_parent": "親フォルダーが存在しません。",
          "used_folder": "フィルターが使用中のフォルダーは削除できません。"
        },
        "gws/memo/message": {
          "file_size_limit": "添付ファイルのサイズ（%{size}）が 最大サイズ（%{limit}）を超えました。",
          "input_message": "本文を入力してください。",
          "member_quota_over": "%{member}さんのメッセージ容量が制限を超過している為、送信できませんでした。",
          "self_quota_over": "メッセージ容量が制限を超過している為、%{action}できませんでした。"
        },
        "gws/model/folder": {
          "found_children": "子フォルダーが存在します。",
          "invalid_chars_as_name": "には次の文字は使えません: \\ / : * ? \" < > |",
          "not_create_same_folder": "フォルダーは既に存在しているか、閲覧権限の無い同名のフォルダーが存在しています。",
          "not_found_parent": "親フォルダーが存在しません。",
          "not_move_to_parent": "最上位フォルダーに変更することはできません。",
          "not_move_to_same_name_folder": "移動先にフォルダーは既に存在しているか、閲覧権限の無い同名のフォルダーが存在しています。",
          "not_move_to_under_other_parent": "最上位のフォルダーをまたいでフォルダーを移動することはできません。"
        },
        "gws/monitor/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/monitor/postable": {
          "file_size_exceeds_post_limit": "添付ファイルのサイズ（%{size}）が投稿の最大サイズ（%{limit}）を超えました。",
          "file_size_exceeds_topic_limit": "添付ファイルの合計サイズ（%{size}）がトピックの最大サイズ（%{limit}）を超えました。"
        },
        "gws/notice/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/notice/post": {
          "exceeded_individual_body_size_limit": "本文（%{size}）が個別容量制限（%{limit}）を超えました。本文を短くしてください。",
          "exceeded_individual_file_size_limit": "添付ファイルサイズ（%{size}）が個別容量制限（%{limit}）を超えました。添付ファイルの容量を小さくしてください。",
          "exceeded_total_body_size_limit": "本文総容量（%{size}）が総容量制限（%{limit}）を超えました。不要なお知らせを削除してください。",
          "exceeded_total_file_size_limit": "添付ファイル総容量（%{size}）が総容量制限（%{limit}）を超えました。不要なお知らせを削除してください。"
        },
        "gws/qna/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/qna/postable": {
          "file_size_exceeds_post_limit": "添付ファイルのサイズ（%{size}）が投稿の最大サイズ（%{limit}）を超えました。",
          "file_size_exceeds_topic_limit": "添付ファイルの合計サイズ（%{size}）がトピックの最大サイズ（%{limit}）を超えました。"
        },
        "gws/report/category": {
          "found_children": "子カテゴリーが存在します。",
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/schedule/holiday": {
          "attributes": {
            "base": {
              "not_found": "%{line_no}: Id %{id} の休日は存在しません。"
            }
          }
        },
        "gws/schedule/plan": {
          "file_size_exceeds_limit": "添付ファイルのサイズ（%{size}）が最大サイズ（%{limit}）を超えました。"
        },
        "gws/schedule/todo_category": {
          "invalid_chars_as_name": "には次の文字は使えません: \\ / : * ? \" < > |"
        },
        "gws/share/category": {
          "not_found_parent": "親カテゴリーが存在しません。",
          "too_deep": "は%{max}階層以下にしてください。"
        },
        "gws/share/file": {
          "file_size_exceeds_capacity": "削除済みファイルを含むファイルサイズ（%{size}）が総容量（%{limit}）を超えました。",
          "file_size_exceeds_folder_limit": "削除済みファイルを含むフォルダーサイズ（%{size}）がフォルダー総容量制限（%{limit}）を超えました。",
          "file_size_exceeds_limit": "ファイルサイズ（%{size}）が最大ファイルサイズ（%{limit}）を超えました。"
        },
        "gws/share/folder": {
          "file_size_exceeds_folder_limit": "削除済みファイルを含むフォルダーサイズ（%{size}）がフォルダー総容量制限（%{limit}）を超えました。",
          "found_files": "フォルダー内、または削除済みのフォルダー内にファイルが存在しています。"
        },
        "member/group": {
          "malformed_email": "%{email} は不正です。",
          "no_admins": "管理者が設定されていません。"
        },
        "ss/model/group": {
          "not_found": "%{line_no} 行目: Id %{id} のグループは存在しません。"
        },
        "ss/model/role": {
          "not_found": "%{line_no} 行目: Id %{id} のロールは存在しません。"
        },
        "ss/model/user": {
          "not_found": "%{line_no} 行目: Id %{id} のユーザーは存在しません。"
        },
        "sys/setting": {
          "password_min_length_short": "は、英大文字〜記号を合計した文字数より少ない文字数が設定されています。%{count}以上に設定してください。"
        }
      }
    },
    "models": {
      "ads/access_log": "広告アクセスログ",
      "ads/banner": "広告バナー",
      "article/node/page": "記事リスト",
      "article/page": "記事ページ",
      "article/part/node": "記事リスト",
      "board/anpi_post": "安否確認投稿",
      "board/node/board": "掲示板",
      "board/post": "掲示板投稿",
      "chat/category": "カテゴリー",
      "chat/history": "履歴",
      "chat/intent": "シナリオ",
      "chat/node/bot": "チャットボット",
      "chat/part/bot": "チャットボット",
      "chorg/changeset": "変更内容",
      "chorg/revision": "リビジョン",
      "chorg/run_params": "組織変更実行オプション",
      "cms/body_layout": "レイアウト",
      "cms/column/base": "入力項目",
      "cms/column/check_box": "チェックボックス",
      "cms/column/date_field": "日付入力",
      "cms/column/file_upload": "ファイルアップロード",
      "cms/column/free": "自由入力",
      "cms/column/headline": "見出し入力",
      "cms/column/list": "リスト入力",
      "cms/column/radio_button": "ラジオボタン",
      "cms/column/select": "ドロップダウン",
      "cms/column/table": "表",
      "cms/column/text_area": "複数行入力",
      "cms/column/text_field": "一行入力",
      "cms/column/url_field": "URL入力",
      "cms/column/url_field2": "URL入力",
      "cms/column/youtube": "YouTube埋め込み",
      "cms/command": "コマンド",
      "cms/editor_template": "テンプレート",
      "cms/file": "共有ファイル",
      "cms/form": "定型フォーム",
      "cms/import_page": "取り込みページ",
      "cms/init_column": "初期ブロック",
      "cms/layout": "レイアウト",
      "cms/loop_setting": "ループHTML",
      "cms/member": "メンバー",
      "cms/node": "フォルダー",
      "cms/node/node": "フォルダーリスト",
      "cms/node/page": "ページリスト",
      "cms/notice": "お知らせ",
      "cms/page": "ページ",
      "cms/page_search": "ページ検索",
      "cms/part": "パーツ",
      "cms/part/crumb": "パンくずリスト",
      "cms/part/free": "HTML記述",
      "cms/part/node": "フォルダーリスト",
      "cms/part/page": "ページリスト",
      "cms/part/tabs": "新着タブ",
      "cms/role": "ロール",
      "cms/site": "サイト",
      "cms/task": "タスク",
      "cms/theme_template": "Theme切り替え",
      "cms/user": "ユーザー",
      "cms/word_dictionary": "かな辞書",
      "cms/workflow/route": "承認経路",
      "event/page": "イベントページ",
      "event/search": "イベント検索ページ",
      "ezine/column": "メルマガ項目",
      "ezine/entry": "メルマガ購読依頼",
      "ezine/member": "メルマガ購読者",
      "ezine/page": "メルマガ記事",
      "facility/image": "施設写真",
      "facility/map": "地図",
      "faq/page": "FAQ記事",
      "gws/attendance/history": "履歴",
      "gws/attendance/record": "レコード",
      "gws/attendance/time_card": "タイムカード",
      "gws/board/category": "カテゴリー",
      "gws/board/post": "投稿",
      "gws/board/topic": "トピック",
      "gws/bookmark": "お気に入り",
      "gws/category": "汎用カテゴリー",
      "gws/chorg/changeset": "変更内容",
      "gws/chorg/revision": "リビジョン",
      "gws/chorg/run_params": "組織変更実行オプション",
      "gws/circular/category": "カテゴリー",
      "gws/circular/post": "トピック",
      "gws/column/base": "入力項目",
      "gws/column/check_box": "チェックボックス",
      "gws/column/date_field": "日付入力",
      "gws/column/file_upload": "ファイルアップロード",
      "gws/column/number_field": "数値入力",
      "gws/column/radio_button": "ラジオボタン",
      "gws/column/select": "ドロップダウン",
      "gws/column/text_area": "複数行入力",
      "gws/column/text_field": "一行入力",
      "gws/column/url_field": "URL入力",
      "gws/contrast": "コントラスト",
      "gws/custom_group": "カスタムグループ",
      "gws/custom_group_member": "カスタムグループメンバー",
      "gws/discussion/forum": "電子会議室",
      "gws/discussion/post": "コメント",
      "gws/discussion/topic": "スレッド",
      "gws/facility/category": "カテゴリー",
      "gws/facility/custom_field": "追加入力",
      "gws/facility/item": "設備",
      "gws/faq/category": "カテゴリー",
      "gws/faq/post": "投稿",
      "gws/faq/topic": "トピック",
      "gws/group": "グループ",
      "gws/history": "操作履歴",
      "gws/history_archive_file": "アーカイブ",
      "gws/job/log": "実行履歴",
      "gws/link": "リンク集",
      "gws/memo/category": "カテゴリー",
      "gws/memo/filter": "フィルター",
      "gws/memo/folder": "フォルダー",
      "gws/memo/forward": "メール転送",
      "gws/memo/group_setting": "メッセージ設定",
      "gws/memo/list": "リスト",
      "gws/memo/message": "メッセージ",
      "gws/memo/signature": "署名",
      "gws/memo/template": "電話メモ",
      "gws/monitor/category": "カテゴリー",
      "gws/monitor/post": "投稿",
      "gws/monitor/topic": "トピック",
      "gws/notice/category": "カテゴリー",
      "gws/notice/comment": "コメント",
      "gws/notice/folder": "フォルダー",
      "gws/notice/post": "お知らせ",
      "gws/personal_address/address": "アドレス",
      "gws/personal_address/group": "グループ",
      "gws/portal/group_portlet": "部課ポータル設定",
      "gws/portal/group_setting": "部課ポートレット",
      "gws/portal/user_portlet": "個人ポータル設定",
      "gws/portal/user_setting": "個人ポートレット",
      "gws/presence": "在席管理",
      "gws/qna/category": "カテゴリー",
      "gws/qna/post": "投稿",
      "gws/qna/topic": "トピック",
      "gws/reminder": "リマインダー",
      "gws/report/category": "カテゴリー",
      "gws/report/file": "レポート",
      "gws/report/form": "テンプレート",
      "gws/role": "権限/ロール",
      "gws/schedule/approval": "承認",
      "gws/schedule/attendance": "出欠",
      "gws/schedule/category": "種別",
      "gws/schedule/comment": "コメント",
      "gws/schedule/holiday": "休日",
      "gws/schedule/plan": "スケジュール",
      "gws/schedule/todo": "ToDo",
      "gws/schedule/todo_category": "プロジェクト・工程",
      "gws/schedule/todo_comment": "ToDoコメント",
      "gws/share": "共有ファイル",
      "gws/share/category": "カテゴリー",
      "gws/share/file": "ファイル",
      "gws/share/file_uploader": "ファイルアップローダー",
      "gws/share/folder": "フォルダー",
      "gws/shared_address/address": "アドレス",
      "gws/shared_address/group": "グループ",
      "gws/staff_record/group": "所属",
      "gws/staff_record/seating": "座席表",
      "gws/staff_record/user": "職員",
      "gws/staff_record/year": "年度",
      "gws/survey/category": "カテゴリー",
      "gws/survey/file": "回答",
      "gws/survey/form": "アンケート",
      "gws/user": "ユーザー",
      "gws/user_form": "拡張情報",
      "gws/user_form_data": "拡張データ",
      "gws/user_setting": "ユーザー設定",
      "gws/user_title": "役職",
      "gws/workflow/category": "ワークフロー種類",
      "gws/workflow/column": "入力項目",
      "gws/workflow/file": "申請書",
      "gws/workflow/form": "申請フォーム",
      "gws/workflow/route": "承認ルート",
      "history/log": "操作履歴",
      "history/trash": "ゴミ箱",
      "inquiry/column": "入力項目",
      "jmaxml/action/base": "受信時の動作",
      "jmaxml/action/publish_page": "記事ページ作成",
      "jmaxml/action/send_mail": "メール送信",
      "jmaxml/action/switch_urgency": "緊急災害レイアウト切替",
      "jmaxml/filter": "フィルター",
      "jmaxml/forecast_region": "気象情報区域",
      "jmaxml/quake_region": "地震情報区域",
      "jmaxml/trigger/ash_fall_forecast": "降灰予報",
      "jmaxml/trigger/base": "受信条件",
      "jmaxml/trigger/flood_forecast": "指定河川洪水予報",
      "jmaxml/trigger/landslide_info": "土砂災害警戒情報",
      "jmaxml/trigger/quake_info": "震源・震度に関する情報",
      "jmaxml/trigger/quake_intensity_flash": "震度速報",
      "jmaxml/trigger/tornado_alert": "竜巻注意情報",
      "jmaxml/trigger/tsunami_alert": "津波警報・注意報・予報",
      "jmaxml/trigger/tsunami_info": "津波情報",
      "jmaxml/trigger/volcano_flash": "噴火速報",
      "jmaxml/trigger/weather_alert": "気象特別警報・警報",
      "jmaxml/tsunami_region": "津波予報区",
      "jmaxml/water_level_station": "水位観測所",
      "job/log": "ジョブ実行履歴",
      "job/task": "タスク",
      "kana/dictionary": "かな辞書",
      "key_visual/image": "キービジュアル画像",
      "ldap/addon/group": "グループ",
      "ldap/addon/user": "ユーザー",
      "ldap/import": "インポート",
      "mail_page/node/page": "メール取込",
      "mail_page/page": "メール取込ページ",
      "member/activity_log": "活動履歴",
      "member/blog_page": "ブログページ",
      "member/group": "グループ",
      "member/group_member": "グループメンバー",
      "member/photo": "フォト",
      "member/photo_spot": "フォトスポット",
      "opendata/app": "アプリ",
      "opendata/crawl": "クローリング",
      "opendata/csv2rdf_setting": "RDF変換設定",
      "opendata/dataset": "データセット",
      "opendata/dataset_group": "データセットグループ",
      "opendata/dataset_importer": "インポート",
      "opendata/export_datasets": "エクスポート",
      "opendata/idea": "アイデア",
      "opendata/idea_comment": "コメント",
      "opendata/import_datasets": "インポート",
      "opendata/license": "ライセンス",
      "opendata/member_notice": "会員通知",
      "opendata/resources": "リソース",
      "rdf/class": "種別",
      "rdf/object": null,
      "rdf/prop": "項目",
      "rdf/vocab": "語彙",
      "recommend/history_log": "履歴",
      "recommend/similarity_score": "スコア",
      "rss/page": "フィード",
      "rss/weather_xml_page": "気象庁防災情報XML",
      "service/account": "アカウント",
      "session": "セッション",
      "simple_captcha/simple_captcha_data": "画像認証",
      "sitemap/node/page": "サイトマップ",
      "sitemap/page": "サイトマップページ",
      "ss/access_token": "アクセストークン",
      "ss/file": "ファイル",
      "ss/group": "グループ",
      "ss/group_file": "グループファイル",
      "ss/max_file_size": "最大ファイルサイズ",
      "ss/migration": "DBマイグレーション",
      "ss/notification": "通知",
      "ss/site": "サイト",
      "ss/task": "タスク",
      "ss/temp_file": "一時ファイル",
      "ss/thumb_file": "サムネイルファイル",
      "ss/user": "ユーザー",
      "ss/user_file": "ユーザーファイル",
      "ss/user_group_history": "異動履歴",
      "ss/user_title": "役職",
      "sys/mail_log": "メールログ",
      "sys/notice": "システムのお知らせ",
      "sys/postal_code": "郵便番号",
      "sys/role": "ロール",
      "sys/setting": "システム設定",
      "sys/site": "サイト",
      "sys/site_copy_task": "サイト複製タスク",
      "sys/user": "ユーザー",
      "voice/file": "読み上げ音声",
      "webmail/address": "個人アドレス帳",
      "webmail/address_group": "個人アドレス帳/グループ",
      "webmail/filter": "フィルター",
      "webmail/group": "グループ",
      "webmail/history": "操作履歴",
      "webmail/history/archive_file": "アーカイブ",
      "webmail/mail": "メール",
      "webmail/mailbox": "フォルダー",
      "webmail/quota": "容量",
      "webmail/role": "権限/ロール",
      "webmail/signature": "署名",
      "webmail/user": "ユーザー",
      "workflow/route": "承認経路"
    }
  },
  "notice": {
    "resend_confirmation_mail": "確認メールを再送しました。"
  },
  "number": {
    "currency": {
      "format": {
        "delimiter": ",",
        "format": "%n%u",
        "precision": 0,
        "separator": ".",
        "significant": false,
        "strip_insignificant_zeros": false,
        "unit": "円"
      }
    },
    "format": {
      "delimiter": ",",
      "precision": 3,
      "separator": ".",
      "significant": false,
      "strip_insignificant_zeros": false
    },
    "human": {
      "decimal_units": {
        "format": "%n %u",
        "units": {
          "billion": "十億",
          "million": "百万",
          "quadrillion": "千兆",
          "thousand": "千",
          "trillion": "兆",
          "unit": ""
        }
      },
      "format": {
        "delimiter": "",
        "precision": 3,
        "significant": true,
        "strip_insignificant_zeros": true
      },
      "storage_units": {
        "format": "%n%u",
        "units": {
          "byte": "バイト",
          "eb": "EB",
          "gb": "GB",
          "kb": "KB",
          "mb": "MB",
          "pb": "PB",
          "tb": "TB"
        }
      }
    },
    "percentage": {
      "format": {
        "delimiter": "",
        "format": "%n%"
      }
    },
    "precision": {
      "format": {
        "delimiter": ""
      }
    }
  },
  "opendata": {
    "api": {
      "group_list_help": "[api] group_list - データセットグループ情報の一覧を取得する。\n[param1] sort - 戻り値のソート対象の項目。\n                name（デフォルト）またはpackagesを指定する。\n[param2] all_fields - 全項目を出力するかどうかを指定する。\n                      True：表示、False：非表示（デフォルト）。\n[param3] groups - 未実装。",
      "group_show_help": "[api] group_show - 公開データセットグループ情報を取得する。\n[param1] id - IDまたは名称が指定した文字列と一致するデータセットグループ情報を出力対象とする。（必須）",
      "package_list_help": "[api] package_list - 公開データセット名一覧を取得する。\n[param1] limit - 出力するデータセット名の最大件数を指定する。\n                 0を指定した場合は件数を制限しない。\n[param2] offset - 出力を開始するデータセットの配列インデックスを指定する。\n                  limitが設定された場合のみ、有効とする。",
      "package_search_help": "[api] package_search - 公開データセット情報に対して、全文検索を行う。\n[param1] q - 全文検索のキーワードを指定する。（初期値：\":\"）\n[param2] fq - 未実装。\n[param3] sort - 未実装。\n[param4] rows - 取得するデータセット情報の最大数を指定する。\n[param5] start - 取得を開始するデータセット情報の配列インデックスを指定する。\n[param6] facet - 未実装。\n[param7] facet.mincount - 未実装。\n[param8] facet.field - 未実装。",
      "package_show_help": "[api] package_show - 公開データセット情報を取得する。\n[param1] id - IDまたは名称が指定した文字列と一致するデータセット情報を出力する。（必須）\n[param2] use_default_schema - 未実装。",
      "resource_search_help": "[api] resource_search - 指定項目に指定値を部分一致で含む公開リソース情報を取得する。\n[param1] query - 検索条件を指定する。（必須）\n                 検索条件は\"項目名:値\"の形式で指定する。（1セットのみ、指定可能。）\n                 下記の項目名のいずれかを指定した場合のみ、有効となる。\n                 （name、description、filename、format）\n[param2] fields - 未実装。（Deprecated）\n[param3] order_by - 昇順でソートを行う項目名を指定する。\n                    下記の項目名のいずれかを指定した場合のみ、有効となる。\n                    （name、description、filename、format）\n[param4] offset - 取得を開始するリソースの配列インデックスを指定する。\n[param5] limit - 取得するリソースの最大件数を指定する。",
      "tag_list_help": "[api] tag_list - タグ名一覧を取得する。\n[param1] query - 指定した文字列を含むタグ名を出力対象とする。\n[param2] all_fields - 未実装。\n[param3] vocabulary_id - 未実装。",
      "tag_show_help": "[api] tag_show - タグが指定した文字列と一致する公開データセット情報の一覧を取得する。\n[param1] id - 指定した文字列と一致するタグを出力対象とする。（必須）"
    },
    "api_state_options": {
      "disabled": "無",
      "enabled": "有"
    },
    "assoc_file_notice": {
      "assoc_file_is_not_updated": "連携ファイルは更新されていません。リソースは最新です。",
      "assoc_file_is_removed": "連携ファイルは削除されています。",
      "assoc_file_is_updated": "連携ファイルは更新されています。",
      "no_assoc_file": "連携ファイルは設定されていません。"
    },
    "assoc_job": {
      "dataset_text": "%{name} の一覧は %{url} でも公開されているので、%{url} もご覧ください。",
      "resource_text": "%{name} は %{now} 時点の情報を元に作成しています。"
    },
    "assoc_page_notice": {
      "assoc_page_is_not_updated": "連携ページは更新されていません。データセットは最新です。",
      "assoc_page_is_removed": "連携ページは削除されています。",
      "assoc_page_is_updated": "連携ページは更新されています。",
      "no_assoc_page": "連携ページは設定されていません。"
    },
    "association_is_removed": "削除されています",
    "buttons": {
      "back": "前へ戻る",
      "build": "RDFを作成する",
      "delete_account": "アカウント削除",
      "next": "次へ進む"
    },
    "ckan": {
      "group": "CKANグループ",
      "organization": "CKAN組織"
    },
    "confirm": {
      "build_csv2rdf": "RDF 変換処理を開始します。よろしいですか？",
      "recreate_rdf": "RDF を再作成しますか？"
    },
    "counter_html": [
      "<div class=\"catalog-date\">",
      "  <div class=\"title\"><h2 class=\"catalog\">データカタログ</h2></div>",
      "  <article class=\"date-number\">",
      "    <div class=\"dateset\">",
      "      <span class=\"number\">#{dataset_count}</span>",
      "      <span>データセット</span>",
      "    </div>",
      "    <div class=\"tag\">",
      "      <span class=\"number\">#{dataset_tag_count}</span>",
      "      <span>タグ</span>",
      "    </div>",
      "    <div class=\"group\">",
      "      <span class=\"number\">#{dataset_group_count}</span>",
      "      <span>グループ</span>",
      "    </div>",
      "  </article>",
      "</div>"
    ],
    "crawl_state": {
      "deleted": "削除",
      "same": null,
      "updated": "更新"
    },
    "crawl_update": {
      "auto": "自動",
      "none": null
    },
    "crawl_update_name": {
      "auto": "自動",
      "none": "手動"
    },
    "create": "新規登録",
    "dataset": "データセット",
    "dataset_catalog": "データカタログ",
    "dataset_group": "グループ",
    "default_state_options": {
      "default": "既定",
      "none": ""
    },
    "download_reports": {
      "dataset_data": "データセット/データ名"
    },
    "errors": {
      "messages": {
        "build_rdf_failed": "RDFの作成に失敗しました。",
        "cannot_connect_fuseki": "Fusekiに接続できません。",
        "destroy_started": "削除処理を開始しました。",
        "dynamic_file": "動的ファイルはクローリングできません。",
        "import_started": "インポート処理を開始しました。",
        "invalid_operator": "操作が不正です。",
        "invalid_rdf": "RDFストアの登録に失敗しました。",
        "invalid_regexp": "正規表現が不正です。",
        "invalid_timeout": "タイムアウトしました。",
        "invalid_type": "タイプが不正です。",
        "property_not_selected": "プロパティが選択されていません。",
        "too_many_categories": "分野の設定数が多すぎます（末端分野の制限数: %{limit}）",
        "too_many_estat_categories": "eStat分野の設定数が多すぎます（末端eStat分野の制限数: %{limit}）",
        "validate_appfile": "はアプリの公開URLを登録している場合、登録できません。",
        "validate_appurl": "はアプリのファイルを登録している場合、入力できません。"
      }
    },
    "export": {
      "emtpy_email_message": "ログインユーザーにメールアドレスが設定されていません。",
      "export_message": "エクスポート処理が完了次第、ログインユーザーのメールアドレスにダウンロードリンクが通知されます。",
      "notify_message": "ダウンロードの準備が完了しました。\n下記のURLからダウンロードしてください。\n\n%{link}",
      "start_message": "エクスポート処理を開始しました。",
      "subject": "[オープンデータ/データセット] エクスポートが完了しました。"
    },
    "harvest": "ハーベスト",
    "harvest_exporter_api_options": {
      "ckan": "Ckan API"
    },
    "harvest_importer_api_options": {
      "ckan": "Ckan API",
      "shirasagi_api": "Shirasagi API",
      "shirasagi_scraper": "Shirasagi スクレイピング"
    },
    "labels": {
      "add_comment": "コメントを投稿",
      "add_idea": "アイデアを投稿する",
      "and_condition": "AND条件",
      "app": "アプリ",
      "app_name": "アプリ名",
      "appfile_name": "アプリファイル名",
      "apps_count": "登録アプリ件数",
      "area": "地域",
      "auto_assing": "自動割付結果",
      "auto_mis_assing": "自動割付ミス",
      "category": "分野",
      "category_ids": "分野",
      "category_prefixes": [
        null,
        "-"
      ],
      "characteristic": "ファイル固有",
      "closed_comment": "コメントは非公開です",
      "comment": "コメント",
      "comment_count": "コメント数",
      "comment_invite_end": "してください",
      "comment_invite_start": "コメントしたい場合には",
      "convert_setting": "コンバート設定",
      "count": "件",
      "count_display": "件のデータを表示しています。",
      "css": "CSS",
      "data": "データ",
      "dataset": "データセット",
      "dataset_name": "データセット名",
      "datasets_count": "登録データセット件数",
      "delete": "削除",
      "delete_account": "アカウントの削除",
      "delete_account_q": "アカウントを削除してよろしいですか？",
      "delete_account_remain": "ユーザー情報は消えますが、過去に投稿したデータは残ります。",
      "delete_comment": "コメントは削除されました",
      "downloaded": "ダウンロード",
      "downloaded_count": "合計ダウンロード数",
      "downloaded_wrap": "一括ダウンロード",
      "edit": "編集",
      "edit_profile": "プロフィールの編集",
      "errors": "エラー",
      "estat-category": "e-Stat分野",
      "estat_category_ids": "eStat分野",
      "execute": "実 行",
      "execute_fullscreen": "全画面表示で実行",
      "executed_count": "実行回数",
      "external_link": "外部リンク",
      "format": "フォーマット",
      "group": "分類",
      "group_ids": "グループ",
      "guest_user": "ゲストユーザー",
      "html": "HTML",
      "idea": "アイデア",
      "idea_name": "アイデア名",
      "ideas_count": "登録アイデア件数",
      "iine": "いいね！",
      "issue": "課題",
      "javascript": "JavaScript",
      "keyword": "キーワード",
      "license": "ライセンス",
      "list_view": "一覧表示",
      "login": "ログイン",
      "login_facebook": "Facebook ID でログイン",
      "login_github": "GitHub アカウントでログイン",
      "login_google": "Google アカウントでログイン",
      "login_history": "ログイン履歴",
      "login_twitter": "twitter ID でログイン",
      "login_yahoo": "YAHOO!JAPAN ID でログイン",
      "management_page": "下記のページで管理することが出来ます。",
      "map_view": "地図表示",
      "more": "もっと見る",
      "new": "新規作成",
      "no_app": "アプリは見つかりませんでした。",
      "no_change_rdf": "この列は RDF へ変換しない",
      "no_dataset": "データセットは見つかりませんでした。",
      "no_dataset_group": "データセットグループは見つかりませんでした。",
      "no_idea": "アイデアは見つかりませんでした。",
      "not_data": "該当するデータは登録されていません",
      "not_exist": "存在しません",
      "not_found_dataset": "データセットがみつかりません。",
      "note": "備考",
      "other": "他",
      "point": "いいね",
      "popular_integer": "一般的な整数データを表します。",
      "popular_real": "一般的な実数データを表します。",
      "popular_string": "一般的な文字列データを表します。",
      "preview": "プレビュー",
      "public_url": "公開URL",
      "rdf_property": "RDF プロパティ",
      "relation_app": "関連アプリ",
      "relation_dataset": "関連データセット",
      "relation_idea": "関連アイデア",
      "request_comment": "コメントは承認待ちです",
      "resource": "リソース",
      "resource_name": "リソース名",
      "sample": "サンプルデータ",
      "samples": "データ",
      "search_option": "検索オプション",
      "size": "サイズ",
      "sort": "並び順",
      "state": "状態",
      "tag": "タグ",
      "time": "回",
      "update_datetime": "更新日時",
      "updated": "%Y年%1m月%1d日 %1H時%1M分"
    },
    "links": {
      "add_appfile": "新しいアプリファイルを追加する",
      "add_comment": "新しいコメントを追加する",
      "add_resource": "新しいリソースを追加する",
      "add_url_resource": "新しいURLを追加する",
      "back_to_column_types": "戻る",
      "back_to_rdf_class": "戻る",
      "back_to_resource": "リソースへ戻る",
      "build_rdf": "RDFに変換する",
      "check_for_update": "更新をチェックする",
      "copy_url": "URLをコピー",
      "dataset_map_datasets_limit": "最大１０件までデータセットを選択できます。",
      "dataset_map_search_datasets": "データセットを探す",
      "deleted": "削除済み",
      "harvest_destroy_datasets": "関連するデータセットを削除する",
      "harvest_import_datasets": "データセットをインポートする",
      "sync": "同期する"
    },
    "manage_appfiles": "アプリファイルを管理する",
    "manage_comments": "コメントを管理する",
    "manage_resources": "リソースを管理する",
    "manage_url_resources": "クローリングを管理する",
    "messages": {
      "build_rdf_success": "RDFの作成に成功しました。",
      "harvest_import_category_settings": "既存の分野設定を破棄しCSVファイルにて上書きします。",
      "harvest_imported_dataset": "よりインポートされたデータセットです。\n変更を行う場合は対象サイトのデータセットを更新して再インポートしてください。",
      "max_pdf_preview_notice": "最大で%{max}ページ表示しています。",
      "max_row_notice": "最大 %{max} 行を表示しています。",
      "require_at_least_two_rows": "2 行以下の CSV ファイルは変換できません。",
      "sent_rdf_success": "RDFストアの登録に成功しました。"
    },
    "notice": {
      "bulk_download_exceeded_filesize": "検索結果の一括ダウンロードサイズが大きすぎます。\\n一括ダウンロードのサイズは、%{size}までを想定しています。\\n申し訳ありませんが、個別にダウンロードしていただくか、検索条件を変更してください。",
      "deleted_account": "アカウントを削除しました。",
      "recreate_rdf": "次のリソースに関連する RDF が作成されています。",
      "resource_preview_error": "リソースをプレビューできませんでした。",
      "source_url": "リンクを登録する際にURLを入力してください。ファイルを設定した場合は入力の必要はありません。",
      "start_export": "エクスポートを開始しました。",
      "started_building_rdf_job": "RDF 変換処理を開始しました。処理結果は「ジョブ実行履歴」で確認してください。"
    },
    "notify_update_plan": {
      "subject": "更新予定のデータセット"
    },
    "operator_condition_options": {
      "match": "一致する",
      "unmatch": "一致しない"
    },
    "public_entity": {
      "download": "公開中のデータセットの一覧を推奨データセット「オープンデータ一覧」の形式にてダウンロードできます。",
      "format": "データセット一覧",
      "headers": [
        "都道府県コード又は市区町村コード",
        "NO",
        "都道府県名",
        "市区町村名",
        "データ名称",
        "データ概要",
        "データ形式",
        "分類１",
        "分類２",
        "分類３",
        "分類４",
        "更新頻度",
        "URL",
        "API対応有無",
        "ライセンス",
        "登録日",
        "最終更新日",
        "備考"
      ]
    },
    "reports": {
      "access_reports": "アクセス数",
      "download_reports": "ダウンロード数",
      "not_exists_reports": "集計結果がありません。",
      "preview_reports": "プレビュー数",
      "report": "レポート",
      "total_month": "月合計",
      "total_year": "年合計"
    },
    "resource": "リソース",
    "search_dataset_groups": {
      "deselect": "削除",
      "index": "データセットグループを選択する",
      "search": "データセットグループを検索",
      "select": "データセットグループを設定する"
    },
    "search_datasets": {
      "bluk_download": "一括ダウンロード",
      "deselect": "削除",
      "download": "ダウンロード(%{size}件)",
      "index": "データセットを選択する",
      "name": "データセット名",
      "search": "データセットを検索",
      "select": "データセットを設定する"
    },
    "search_options": {
      "all_keywords": "すべてのキーワードを含む",
      "any_conditions": "すべてをOR条件で検索する",
      "any_keywords": "いずれかのキーワードを含む"
    },
    "sort_options": {
      "apps": {
        "attention": "注目アプリ",
        "popular": "人気アプリ",
        "released": "新着アプリ"
      },
      "attention": "注目順",
      "count_desc": "件数（降順）",
      "datasets": {
        "attention": "注目データセット",
        "popular": "人気データセット",
        "released": "新着データセット"
      },
      "ideas": {
        "attention": "注目アイデア",
        "popular": "人気アイデア",
        "released": "新着アイデア"
      },
      "popular": "人気順",
      "released": "新着順"
    },
    "state_options": {
      "closed": "非公開",
      "public": "公開"
    },
    "tag": "タグ",
    "type_condition_options": {
      "ckan_group": "CKANグループ",
      "ckan_tag": "CKANタグ",
      "regexp": "正規表現",
      "shirasagi_area": "SHIRASAGI地域",
      "shirasagi_category": "SHIRASAGI分野",
      "string": "文字列"
    },
    "update_plan_unit_options": {
      "five_yearly": "５年",
      "four_yearly": "４年",
      "monthly": "毎月",
      "quarterly": "四半期",
      "three_yearly": "３年",
      "two_yearly": "２年",
      "yearly": "毎年"
    }
  },
  "rdf": {
    "apis": {
      "search_options": {
        "name": "名前",
        "search": "検索",
        "vocab": "語彙"
      }
    },
    "buttons": {
      "import": "インポート",
      "manage_props": "プロパティを管理する"
    },
    "classes": {
      "append_property": "プロパティ追加",
      "search_property_class": "型を変更する",
      "search_sub_class": "継承を変更する"
    },
    "errors": {
      "unable_to_load_graph": "RDF が読み取れません。サポートしていないファイルか空のファイルが指定されています。",
      "unable_to_load_vocab": "語彙が読み取れません。サポートしていないファイルが指定されています。"
    },
    "links": {
      "back_to_class": "クラスへ戻る",
      "classes": "クラス",
      "import": "インポート",
      "props": "プロパティ",
      "vocab": "語彙情報",
      "vocabs": "RDF語彙"
    },
    "notice": {
      "imported_props": "プロパティをインポートしました。",
      "start_import_job": "インポート処理を開始しました。処理結果は「ジョブ実行履歴」を参照してください。"
    },
    "props": {
      "search_domain": "定義域を変更する",
      "search_range": "値域を変更する"
    },
    "vocabs": {
      "import": "インポート",
      "in_file": "ファイル",
      "owner_system": "共通語彙",
      "owner_user": "ユーザー語彙"
    }
  },
  "recommend": {
    "main": "レコメンド機能",
    "paths": "アクセス（パス）",
    "scores": "類似度スコア",
    "tokens": "アクセス（トークン）"
  },
  "remarks": {
    "cms/model/member": {
      "addr": [
        "住所を入力してください。"
      ],
      "birthday": [
        "生年月日を入力してください。"
      ],
      "email": [
        "半角英数字記号で入力してください。",
        "ログインに利用したり、大切な情報を配信したりする際に利用させていただきます。"
      ],
      "email_again": [
        "メールアドレスの確認として、上記と同じメールアドレスを入力してください。"
      ],
      "email_type": [
        "受信可能なメールの形式を選択してください。"
      ],
      "in_password": [
        "パスワードを入力してください。"
      ],
      "in_password_again": [
        "パスワードの確認として、上記と同じパスワードを入力してください。"
      ],
      "job": [
        "職種を入力してください。"
      ],
      "kana": [
        "お名前のふりがなをひらがなで入力してください。"
      ],
      "name": [
        "お名前を入力してください。"
      ],
      "organization_name": [
        "勤務先の会社名や所属する団体名を入力してください。"
      ],
      "postal_code": [
        "郵便番号を入力してください。"
      ],
      "tel": [
        "電話番号を入力してください。"
      ]
    }
  },
  "rss": {
    "buttons": {
      "import": "取込"
    },
    "confirm": {
      "import": "取り込みますが、よろしいですか？"
    },
    "messages": {
      "job_started": "取り込みジョブを開始しました。"
    },
    "options": {
      "earthquake_intensity": {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5+": "5強",
        "5-": "5弱",
        "6+": "6強",
        "6-": "6弱",
        "7": "7"
      },
      "rss_refresh_method": {
        "auto": "自動",
        "manual": "手動"
      }
    },
    "page": "フィード",
    "weather_xml_page": "気象庁防災情報XML"
  },
  "service": {
    "buttons": {
      "reload": "更新"
    },
    "errors": {
      "invalid_login": "ログインできませんでした。"
    },
    "menu": {
      "accounts": "アカウント一覧",
      "my_account": "アカウント情報"
    },
    "messages": {
      "disabled_app": "[%{name}]このアプリケーションは利用が停止されています。",
      "over_quota": "使用容量が制限を超過しています。"
    }
  },
  "simple_captcha": {
    "label": "画像の数字を入力してください",
    "message": {
      "default": "が正しくありません"
    },
    "placeholder": "",
    "refresh_button_text": "違う画像"
  },
  "sitemap": {
    "buttons": {
      "export_urls": "URLリスト出力"
    }
  },
  "sns": {
    "account": "アカウント",
    "connection": "接続情報",
    "errors": {
      "invalid_login": "ログインできませんでした。"
    },
    "file": "ファイル",
    "file_attach": "添付貼付",
    "group_file": "グループファイル",
    "image_paste": "画像貼付",
    "message": {
      "notification": {
        "no_recents": "新着はありません"
      }
    },
    "profile": "プロフィール",
    "thumb_paste": "サムネイル",
    "user_file": "ユーザーファイル"
  },
  "ss": {
    "all": "すべて",
    "apis": {
      "groups": {
        "index": "グループを選択する",
        "search": "グループを検索",
        "select": "グループを設定する"
      },
      "organizations": {
        "index": "組織を選択する",
        "label": "組織名",
        "search": "組織を検索",
        "select": "組織を設定する"
      },
      "users": {
        "index": "ユーザーを選択する",
        "search": "ユーザーを検索",
        "select": "ユーザーを設定する"
      }
    },
    "basic_info": "基本情報",
    "buttons": {
      "add": "追加",
      "attach": "添付",
      "cancel": "キャンセル",
      "change": "変更",
      "clear": "クリア",
      "close": "閉じる",
      "closed_save": "非公開保存",
      "confirm": "確認",
      "convert": "変換",
      "copy": "コピー",
      "csv": "CSV",
      "delete": "削除",
      "deselect_all": "全て解除",
      "download": "ダウンロード",
      "draft_save": "下書き保存",
      "edit": "編集",
      "ignore_alert": "警告を無視する",
      "ignore_alerts_and_save": "警告を無視して保存する",
      "import": "インポート",
      "initialize": "初期化",
      "integrate": "統合",
      "move": "移動",
      "new": "新規作成",
      "paste": "貼り付け",
      "print": "印刷",
      "publish": "公開",
      "publish_save": "公開保存",
      "random_password": "ランダム生成",
      "replace": "置換",
      "replace_all": "全置換",
      "request": "公開申請",
      "reset": "リセット",
      "restore": "元に戻す",
      "run": "実行",
      "save": "保存",
      "search": "検索",
      "select_all": "全て選択",
      "send": "送信",
      "setting": "設定",
      "split": "分割",
      "stop": "停止",
      "toggle": "折りたたみ表示",
      "unlock_and_edit_forcibly": "強制的にロックを解除し編集する",
      "upload": "アップロード"
    },
    "config": "設定",
    "confirm": {
      "clone": "複製してよろしいですか？",
      "convert": "変換してよろしいですか？",
      "delete": "削除してよろしいですか？",
      "depublish": "非公開にしてよろしいですか？",
      "download": "ダウンロードしてよろしいですか？",
      "export": "エクスポートを開始してよろしいですか？",
      "hard_delete": "完全に削除してよろしいですか？",
      "import": "インポートを開始してよろしいですか？",
      "in_use": "使用中のファイルを削除してよろしいですか？",
      "initialize": "初期化してよろしいですか？",
      "move": "移動してよろしいですか？",
      "publish": "公開してよろしいですか？",
      "redirect": "下記のページにアクセスしようとしています。",
      "reset_tag": "タグを削除してよろしいですか？",
      "restore": "元に戻してよろしいですか？",
      "send": "送信してよろしいですか？",
      "set_tag": "タグを設定してよろしいですか？",
      "soft_delete": "削除してよろしいですか？",
      "unload": "入力したデータは保存されません。"
    },
    "default_here_label": "詳細はこちら⇒",
    "download": "ダウンロード",
    "encoding": "文字コード",
    "errors": {
      "import": {
        "blank_file": "ファイルを入力してください。",
        "invalid_file_type": "不正なファイル形式です。"
      }
    },
    "export": "エクスポート",
    "export_log": "エクスポートログ",
    "file": "ファイル",
    "group_users": "所属ユーザー",
    "image": "画像",
    "import": "インポート",
    "info": {
      "soft_delete": "データの実削除ではなく無効状態として保存されます。"
    },
    "keyword": "キーワード",
    "links": {
      "back": "戻る",
      "back_to_administration": "管理画面へ戻る",
      "back_to_index": "一覧へ戻る",
      "back_to_show": "詳細へ戻る",
      "change": "変更する",
      "cms": "サイト管理",
      "command": "コマンド",
      "copy": "複製する",
      "copy_email_address": "メールアドレスをコピー",
      "decode": "デコードする",
      "delete": "削除する",
      "delete_all": "すべて削除する",
      "download": "ダウンロード",
      "download_sample_csv": "サンプルCSVをダウンロード",
      "download_template": "雛形をダウンロード",
      "edit": "編集する",
      "export": "エクスポート",
      "gws": "グループ",
      "import": "インポート",
      "initialize": "初期化する",
      "input": "入力する",
      "integrate": "統合する",
      "lock_user": "利用を停止する",
      "markdown_help": "Markdown ヘルプ",
      "mobile": "携帯",
      "mobile_preview": "携帯プレビュー",
      "more": "もっと見る",
      "more_all": "全て見る",
      "move": "移動する",
      "new": "新規作成",
      "new_post": "新規投稿",
      "open": "開く",
      "parent_directory": "上の階層へ",
      "pc": "PC",
      "pc_preview": "PCプレビュー",
      "post": "投稿",
      "preview": "プレビュー",
      "print": "印刷する",
      "reply": "返信する",
      "reset_tags": "タグ解除",
      "resize": "リサイズする",
      "restore": "元に戻す",
      "select": "選択する",
      "send_email": "メールを作成する",
      "send_message": "メッセージを作成する",
      "set_tag": "タグ設定",
      "show": "詳細を見る",
      "split": "分割する",
      "trash": "ゴミ箱",
      "unlock_user": "利用停止を解除する",
      "upload": "アップロード",
      "view_site": "公開画面を見る"
    },
    "log": "ログ",
    "login": "ログイン",
    "login_url": "ログインURL",
    "logout": "ログアウト",
    "management": "管理",
    "module": "モジュール",
    "navi": {
      "editable": "管理一覧",
      "readable": "閲覧一覧",
      "seen": "既読一覧",
      "trash": "ゴミ箱",
      "unseen": "未読一覧"
    },
    "notice": {
      "already_job_started": "実行準備中であるか、実行中です。",
      "clipboard_copied": "コピーしました。",
      "clipboard_copy_failed": "コピーできませんでした。クリップボードがサポートされていません。",
      "copied": "複製しました。",
      "deleted": "削除しました。",
      "depublished": "非公開にしました。",
      "file_droppable": "ファイルをドロップすることでアップロードできます。",
      "first_to_last": "件を表示しています。",
      "hit": "件ヒットしました。",
      "initialized": "初期化しました。",
      "lock_user_all": "利用を停止しました。",
      "move_all": "移動しました。",
      "moved": "移動しました。",
      "posted": "投稿しました。",
      "published": "公開しました。",
      "restored": "元に戻しました。",
      "run": "実行しました。",
      "saved": "保存しました。",
      "sent": "送信しました。",
      "set_seen": "既読にしました。",
      "set_seen_all": "既読にしました。",
      "set_star": "スターをつけました。",
      "set_star_all": "スターをつけました。",
      "started_import": "インポートを開始しました。",
      "text_zoomed": "文字サイズを %{count} に設定しました。",
      "unlock_user_all": "利用停止を解除しました。",
      "unset_seen": "未読にしました。",
      "unset_seen_all": "未読にしました。",
      "unset_star": "スターをはずしました。",
      "unset_star_all": "スターをはずしました。",
      "uploading": "アップロードしています。"
    },
    "options": {
      "csv_encoding": {
        "Shift_JIS": "シフトJIS（Excel 2016 より前）",
        "UTF-8": "UTF-8（Excel 2016 以降）"
      },
      "datetime_unit": {
        "day": "日",
        "month": "か月",
        "week": "週",
        "year": "年"
      },
      "first_released": {
        "draft": "未公開",
        "published": "公開済み"
      },
      "kana_format": {
        "hiragana": "ひらがな",
        "katakana": "カタカナ",
        "romaji": "ローマ字"
      },
      "map_api": {
        "googlemaps": "Googleマップ",
        "openlayers": "OpenLayers"
      },
      "multibyte_filename_state": {
        "disabled": "アップロード不可",
        "enabled": "アップロード可"
      },
      "opengraph_type": {
        "article": "記事",
        "none": "なし"
      },
      "resizing": {
        "1024x768": "1024x768 (XGA横)",
        "1280x720": "1280x720 (HD横)",
        "240x320": "240x320 (QVGA縦)",
        "320x240": "320x240 (QVGA横)",
        "480x640": "480x640 (VGA縦)",
        "600x800": "600x800 (SVGA縦)",
        "640x480": "640x480 (VGA横)",
        "720x1280": "720x1280 (HD縦)",
        "768x1024": "768x1024 (XGA縦)",
        "800x600": "800x600 (SVGA横)"
      },
      "restriction": {
        "api_only": "API利用のみ",
        "none": "制限なし"
      },
      "session_lifetime": {
        "15min": "15分",
        "30min": "30分",
        "5min": "5分",
        "60min": "60分"
      },
      "sort": {
        "created_asc": "作成日時(日付順)",
        "created_desc": "作成日時(新着順)",
        "filename": "ファイル名",
        "filename_asc": "ファイル名(昇順)",
        "filename_desc": "ファイル名(降順)",
        "order_asc": "指定値(昇順)",
        "order_desc": "指定値(降順)",
        "updated_asc": "更新日時(日付順)",
        "updated_desc": "更新日時(新着順)"
      },
      "state": {
        "active": "有効",
        "all": "全て",
        "allow": "許可する",
        "approve": "承認",
        "cancel": "取消",
        "closed": "非公開",
        "closing": "公開終了待ち",
        "deleted": "削除済み",
        "deny": "許可しない",
        "disabled": "無効",
        "draft": "下書き",
        "enabled": "有効",
        "expired": "無効",
        "force_silence": "通知しない（全体管理）",
        "hide": "非表示",
        "notify": "通知する",
        "optional": "任意",
        "pending": "下位承認待ち",
        "public": "公開",
        "ready": "公開待ち",
        "remand": "差し戻し",
        "request": "申請",
        "required": "必須",
        "show": "表示",
        "silence": "通知しない",
        "start": "選択"
      },
      "text_type": {
        "markdown": "Markdown形式",
        "plain": "テキスト形式"
      },
      "text_zoom": {
        "reset": "標準",
        "zoom_in": "+",
        "zoom_out": "-"
      },
      "twitter_card": {
        "none": "なし",
        "summary": "サマリー形式",
        "summary_large_image": "大きな画像形式"
      },
      "user_lock_state": {
        "locked": "利用停止",
        "unlocked": "利用可"
      },
      "wareki": {
        "heisei": "平成",
        "meiji": "明治",
        "reiwa": "令和",
        "seireki": "西暦",
        "showa": "昭和",
        "taisho": "大正"
      }
    },
    "quota": "容量",
    "regexp": "正規表現",
    "required_field": "※必須入力",
    "resize_image": "画像リサイズ",
    "role": "ロール",
    "role_setting": "ロール一括設定",
    "search_result": "検索結果",
    "state": {
      "approve": "承認",
      "closed": "非公開",
      "draft": "下書き",
      "edit": "編集中",
      "public": "公開中",
      "ready": "公開待ち",
      "remand": "差し戻し",
      "request": "申請中"
    },
    "tasks": {
      "confirm_reset": "処理が終わっていない場合、複数回実行されてしまいます。\\nタスクを削除してよろしいですか？",
      "confirm_start": "処理を開始しますか？",
      "interrupted": "中断命令を送信しました。",
      "started": "開始しました。"
    },
    "text_zoom": "文字サイズ",
    "units": {
      "count": "件",
      "days_after": "日後",
      "days_before": "日前",
      "days_progress": "日経過",
      "mega_byte": "MB",
      "mobile_size": "KB(キロバイト)"
    },
    "url": "URL",
    "views": {
      "login/login": {
        "id": "ユーザーIDまたはメールアドレス",
        "organization_uid": "職員番号またはメールアドレス",
        "password": "パスワード"
      }
    },
    "wareki": {
      "heisei": {
        "max": "2019/5/1",
        "min": "1989/1/8",
        "name": "平成"
      },
      "meiji": {
        "max": "1912/7/30",
        "min": "1868/1/25",
        "name": "明治"
      },
      "reiwa": {
        "max": "2100/1/1",
        "min": "2019/5/1",
        "name": "令和"
      },
      "seireki": {
        "max": "2100/1/1",
        "min": "0001/1/1",
        "name": "西暦"
      },
      "showa": {
        "max": "1989/1/8",
        "min": "1926/12/25",
        "name": "昭和"
      },
      "taisho": {
        "max": "1926/12/25",
        "min": "1912/7/30",
        "name": "大正"
      }
    },
    "warning": {
      "initial_password": "初期パスワードを変更してください。",
      "password_expired": "パスワードの有効期限が切れました。パスワードを変更してください。",
      "password_neary_expired": "もうすぐパスワードの有効期限が切れます。パスワードを変更してください。",
      "session_timeout": "セッションの有効期限が切れました。"
    },
    "wave_dash": "～"
  },
  "support": {
    "array": {
      "last_word_connector": "と",
      "two_words_connector": "と",
      "words_connector": "と"
    }
  },
  "sys": {
    "ad": "ログイン画面広告",
    "apis": {
      "sites": {
        "index": "サイトを選択する",
        "search": "サイトを検索",
        "select": "サイトを設定する"
      }
    },
    "auth": "認証",
    "auth/environment": "環境変数",
    "auth/open_id_connect": "OpenID Connect",
    "auth/saml": "SAML",
    "conf": "システム設定",
    "db_tool": "DBツール",
    "group": "グループ",
    "import_official_japan_postal_service_csv": "日本郵政CSVの取り込み",
    "links": {
      "back_to_contents": "マイページへ戻る",
      "new_from_discovery": "Discovery から作成",
      "new_from_metadata": "メタデータ インポート"
    },
    "login": {
      "ad": "広告"
    },
    "max_file_size": "最大ファイルサイズ",
    "menu_settings": "メニュー設定",
    "notice": "システムのお知らせ",
    "options": {
      "auth_state": {
        "disabled": "無効",
        "enabled": "有効"
      },
      "copy_contents": {
        "dictionaries": "かな辞書",
        "editor_templates": "テンプレート",
        "files": "共有ファイル",
        "pages": "記事、その他ページ"
      },
      "force_authn_state": {
        "disabled": "要求しない",
        "enabled": "要求する"
      }
    },
    "password_change_constraint": "パスワード変更時の制約",
    "password_constraint": "パスワードの制約",
    "password_constraint_detail": "各種文字種",
    "password_effective_period": "パスワードの有効期限",
    "password_login": "ログイン",
    "password_policy": "パスワードポリシー",
    "postal_code": "郵便番号",
    "postal_code_normalize_city": "以下に掲載がない場合",
    "prefecture_code": "地域コード",
    "prompts": {
      "char": "文字",
      "count": "回"
    },
    "remote_addr": "接続元IPアドレス",
    "role": "権限/ロール",
    "roles": {
      "admin": "管理者",
      "user": "一般ユーザー"
    },
    "server_addr": "サーバーIPアドレス",
    "server_name": "サーバー名",
    "site": "サイト",
    "site_copy": "サイト複製",
    "site_copy/description": "※フォルダー、固定ページ、レイアウト、パーツは必須で複製されます",
    "site_copy/started_job": "サイト複製を開始しました。",
    "site_copy/task_status": "実行状況",
    "test": "テスト",
    "user": "ユーザー",
    "user_agent": "ユーザーエージェント"
  },
  "sys_role": {
    "edit_sys_groups": "グループの管理",
    "edit_sys_mail_logs": "メールログの管理",
    "edit_sys_notices": "システムのお知らせ管理",
    "edit_sys_roles": "権限/ロールの管理",
    "edit_sys_settings": "システム設定の管理",
    "edit_sys_sites": "サイトの管理",
    "edit_sys_users": "ユーザーの管理",
    "use_cms": "CMSの利用",
    "use_gws": "GWSの利用",
    "use_webmail": "メールの利用"
  },
  "time": {
    "am": "午前",
    "formats": {
      "default": "%Y/%1m/%1d %H:%M",
      "gws_long": "%Y年 %1m月%1d日 (%a) %1H:%M",
      "gws_time": "%1H:%M",
      "iso": "%Y-%m-%d %H:%M",
      "long": "%Y年%1m月%1d日 %H時%M分",
      "picker": "%Y/%m/%d %H:%M",
      "short": "%y/%m/%d %H:%M"
    },
    "pm": "午後"
  },
  "tooltip": {
    "ads/addon/page_list": {
      "link_action": [
        "リンクの動作を設定します。",
        null,
        "クッションページ：",
        "外部サイトへ移動する旨のページを表示します。",
        null,
        "直リンク：",
        "直接外部サイトへ移動します。",
        "アクセス集計には反映されません。"
      ],
      "link_target": [
        "リンクの表示形式を設定します。"
      ],
      "lower_html": [
        "リスト部分の下部に任意の内容をHTMLで記述することが可能です。"
      ],
      "sort": [
        "どういった順でリストの並べるかを指定します。"
      ],
      "upper_html": [
        "リスト部分の上部に任意の内容をHTMLで記述することが可能です。"
      ],
      "with_category": [
        "表示中のページにカテゴリーが設定されている場合、そのカテゴリーを設定しているバナーのみ表示します。"
      ]
    },
    "ads/banner": {
      "additional_attr": [
        "a要素の追加属性を入力します。"
      ],
      "file_id": [
        "広告バナーに利用する画像を登録します。"
      ],
      "link_url": [
        "広告バナーのリンク先のURLを入力します。"
      ],
      "name": [
        "広告バナーのリンク先のサイト名を入力します。",
        "画像のalt属性にも利用します。"
      ]
    },
    "board/addon/anpi_post_setting": {
      "deny_ips": [
        "投稿、返信等を拒否するIPアドレスを設定します。",
        "帯域での設定が可能です。",
        "複数のIPアドレスを設定する場合は改行区切りで記述します。"
      ],
      "show_email": [
        "メールアドレスを公開するかどうかを指定します。"
      ],
      "text_size_limit": [
        "投稿可能な最大文字数を指定します。"
      ]
    },
    "board/addon/file_setting": {
      "file_ext_limit": [
        "添付可能なファイルの拡張子を指定します。",
        "指定がない場合は制限無く添付可能となります。"
      ],
      "file_limit": [
        "投稿に添付できるファイル数を指定します。"
      ],
      "file_scan": [
        "添付ファイルのウイルススキャンを有効にできます。"
      ],
      "file_size_limit": [
        "添付ファイルの最大容量を指定します。"
      ]
    },
    "board/addon/google_person_finder_setting": {
      "gpf_api_key": [
        "APIキーを指定します。",
        "テストの場合は '43HxMWGBijFaYEr5' を指定します。"
      ],
      "gpf_domain_name": [
        "ドメイン名を指定します。",
        "テストの場合は 'testkey.personfinder.google.org' を指定します。"
      ],
      "gpf_repository": [
        "リポジトリを指定します。",
        "テストの場合は 'test' を指定します。"
      ],
      "gpf_state": [
        "Google Person Finder との連携を有効にするかどうかを指定します。"
      ]
    },
    "board/addon/list": {
      "limit": [
        "投稿の表示件数を指定します。"
      ],
      "lower_html": [
        "投稿一覧の下部に任意の内容のHTMLを記述することが可能です。"
      ],
      "mode": [
        "掲示板の表示形式を指定します。"
      ],
      "upper_html": [
        "投稿一覧の上部に任意の内容のHTMLを記述することが可能です。"
      ]
    },
    "board/addon/map_point": {
      "point": [
        "位置を設定します。"
      ]
    },
    "board/addon/map_setting": {
      "map_center": [
        "中心座標を指定します。",
        "地図の中心座標を指定する際、自動的に縮尺レベルも設定されます。"
      ],
      "map_state": [
        "地図入力を有効にするかどうかを指定します。"
      ],
      "map_view_state": [
        "地図表示を有効にするかどうかを指定します。"
      ],
      "map_zoom_level": [
        "地図の縮尺を 0 ～ 18 の数値で指定します。"
      ]
    },
    "board/addon/post_setting": {
      "banned_words": [
        "禁止用語を設定します。",
        "該当する禁止用語がタイトルまたは本文に含まれる場合、投稿できません。",
        "複数の語句を設定する場合は改行区切りで記述します。"
      ],
      "deletable_post": [
        "削除キーを使用して投稿を削除可能かを設定します。"
      ],
      "deny_ips": [
        "投稿、返信等を拒否するIPアドレスを設定します。",
        "帯域での設定が可能です。",
        "複数のIPアドレスを設定する場合は改行区切りで記述します。"
      ],
      "deny_url": [
        "URLを投稿本文に含めることができるかを設定します。"
      ],
      "show_email": [
        "投稿時にメールアドレスを使用するか設定します。"
      ],
      "show_url": [
        "投稿時にURLを使用するか設定します。"
      ],
      "text_size_limit": [
        "投稿可能な最大文字数を指定します。"
      ]
    },
    "board/addon/public_scope": {
      "public_scope": [
        "安否の公開範囲を指定します。",
        "「全体に公開」を指定すると、誰でも安否を見ることができるようになります。",
        "「グループに公開」を指定すると、グループ内の会員のみが安否を見ることができます。",
        "「非公開」を指定すると、自分以外は安否を見ることができなくなります。"
      ]
    },
    "board/model/anpi_post": {
      "addr": [
        "住所を設定します。"
      ],
      "age": [
        "年齢を設定します。"
      ],
      "email": [
        "メールアドレスを設定します。"
      ],
      "kana": [
        "名前（かな）を設定します。"
      ],
      "name": [
        "名前を設定します。"
      ],
      "sex": [
        "性別を指定します。"
      ],
      "tel": [
        "電話番号を設定します。"
      ],
      "text": [
        "メッセージを設定します。"
      ]
    },
    "category/addon/category": {
      "categories": [
        "表示するカテゴリーページの名称にチェックを入れます。"
      ]
    },
    "category/addon/integration": {
      "integration_partial_node": [
        "統合対象となるフォルダーを選択します。",
        "統合後は削除されます。"
      ]
    },
    "category/addon/split": {
      "split_partial_node_basename": [
        "分割後のフォルダー名を入力します。"
      ],
      "split_partial_node_name": [
        "分割後のフォルダータイトルを入力します。"
      ]
    },
    "chat/addon/category": {
      "category_ids": [
        "カテゴリーを設定します。"
      ]
    },
    "chat/addon/path": {
      "chat_path": [
        "フォルダーのパスを設定します。",
        "デフォルトでは親フォルダーを使用します。"
      ]
    },
    "chat/addon/text": {
      "chat_retry": [
        "フィードバックに対して\"いいえ\"を押された場合に表示される文章を設定できます。"
      ],
      "chat_success": [
        "フィードバックに対して\"はい\"を押された場合に表示される文章を設定できます。"
      ],
      "exception_text": [
        "対応するフレーズが見つからない場合に返答する文章を設定できます。"
      ],
      "first_suggest": [
        "チャットボットの開始時に表示されるサジェストを設定できます。",
        "改行でサジェストを複数設定できます。"
      ],
      "first_text": [
        "チャットボットの開始時に表示される文章を設定できます。"
      ],
      "question": [
        "フィードバックの文章を設定できます。"
      ],
      "response_template": [
        "シナリオの返答を設定します。",
        "シナリオ作成時に返答がない場合に使用されます。"
      ]
    },
    "chat/category": {
      "name": [
        "名前を設定します。"
      ],
      "order": [
        "並び順を設定します。"
      ]
    },
    "chat/intent": {
      "name": [
        "名前を設定します。"
      ],
      "order": [
        "並び順を設定します。"
      ],
      "phrase": [
        "フレーズを設定します。",
        "改行でフレーズを複数設定できます。",
        "チャットボットで指定のフレーズが使用されていると返答します。"
      ],
      "question": [
        "フィードバックを表示するか設定します。"
      ],
      "response": [
        "返答を設定します。",
        "チャットボットで指定のフレーズが使用されていると返答します。",
        "設定しない場合、親フォルダーの返答テンプレートを使用します。"
      ],
      "site_search": [
        "サイト内検索のリンクを表示するか設定します。"
      ],
      "suggest": [
        "サジェストを設定できます。",
        "改行でサジェストを複数設定できます。",
        "チャットボットで指定のフレーズが使用されているとサジェストを返します。"
      ]
    },
    "chorg": {
      "views": {
        "add_changesets": {
          "contact_email": [
            "新設するグループのメールアドレスを入力します。"
          ],
          "contact_fax": [
            "新設するグループのファックス番号を入力します。"
          ],
          "contact_link_name": [
            "新設するグループのリンク名を入力します。"
          ],
          "contact_link_url": [
            "新設するグループのリンクURLを入力します。"
          ],
          "contact_tel": [
            "新設するグループの電話番号を入力します。"
          ],
          "ldap_dn": [
            "LDAPを利用している場合は新設するグループの識別子(DN)を入力します。"
          ],
          "name": [
            "新設するのグループ名を入力します。"
          ],
          "order": [
            "グループ画面での表示順を入力します。",
            "数字が小さいほど上位に表示されます。"
          ]
        },
        "delete_changesets": {
          "name": [
            "廃止するグループ名を選択します。"
          ]
        },
        "division_changesets": {
          "before_name": [
            "分割元のグループ名を選択します。"
          ],
          "contact_email": [
            "分割後のグループのメールアドレスを入力します。"
          ],
          "contact_fax": [
            "分割後のグループのファックス番号を入力します。"
          ],
          "contact_link_name": [
            "分割後のグループのリンク名を入力します。"
          ],
          "contact_link_url": [
            "分割後のグループのリンクURLを入力します。"
          ],
          "contact_tel": [
            "分割後のグループの電話番号を入力します。"
          ],
          "ldap_dn": [
            "LDAPを利用している場合は分割後のグループの識別子(DN)を入力します。"
          ],
          "name": [
            "分割後ののグループ名を入力します。"
          ],
          "order": [
            "グループ画面での表示順を入力します。",
            "数字が小さいほど上位に表示されます。"
          ]
        },
        "move_changesets": {
          "before_name": [
            "移動元のグループ名を選択します。"
          ],
          "contact_email": [
            "移動先グループのメールアドレスを入力します。"
          ],
          "contact_fax": [
            "移動先グループのファックス番号を入力します。"
          ],
          "contact_link_name": [
            "移動先グループのリンク名を入力します。"
          ],
          "contact_link_url": [
            "移動先グループのリンクURLを入力します。"
          ],
          "contact_tel": [
            "移動先グループの電話番号を入力します。"
          ],
          "ldap_dn": [
            "LDAPを利用している場合は移動先グループの識別子(DN)を入力します。"
          ],
          "name": [
            "移動先のグループ名を入力します。"
          ],
          "order": [
            "グループ画面での表示順を入力します。",
            "数字が小さいほど上位に表示されます。"
          ]
        },
        "unify_changesets": {
          "before_name": [
            "統合元のグループ名を選択します。"
          ],
          "contact_email": [
            "統合先グループのメールアドレスを入力します。"
          ],
          "contact_fax": [
            "統合先グループのファックス番号を入力します。"
          ],
          "contact_link_name": [
            "統合先グループのリンク名を入力します。"
          ],
          "contact_link_url": [
            "統合先グループのリンクURLを入力します。"
          ],
          "contact_tel": [
            "統合先グループの電話番号を入力します。"
          ],
          "ldap_dn": [
            "LDAPを利用している場合は統合先グループの識別子(DN)を入力します。"
          ],
          "name": [
            "統合先のグループ名を入力します。"
          ],
          "order": [
            "グループ画面での表示順を入力します。",
            "数字が小さいほど上位に表示されます。"
          ]
        }
      }
    },
    "chorg/model/revision": {
      "delete_method": [
        "ユーザーとグループの削除方法を選択します。",
        "「無効にし、後で回復できるようにする」を選択すると、ユーザーとグループは無効状態になって残ります。",
        "「常に物理削除する」を選択すると、ユーザーとグループは完全に削除されます。"
      ],
      "name": [
        "組織変更の名称を入力します。"
      ],
      "revision_csv_file_id": [
        "組織変更操作（新設、移動、統合、分割、廃止）を登録する為のCSVファイルを選択します。",
        "CSVファイルから登録を行う場合、既に登録されている操作は削除されます。",
        "",
        "「サンプルCSVをダウンロード」より、自治体サンプルサイトの組織変更操作例をダウンロードできます。",
        "内容を修正してインポートしてください。"
      ],
      "user_csv_file_id": [
        "組織変更実行後にユーザーの異動を行うためのユーザーCSVファイルを選択します。",
        "ユーザーCSVには異動後のグループ名や役職を設定してください。",
        null,
        "ファイルを選択しない場合、組織変更実行後にユーザーは異動しませんので手動でユーザーを異動させてください。"
      ]
    },
    "chorg/revision": {
      "content_csv_file_id": [
        "組織変更実行後にパーツ、レイアウト、ページ、フォルダーの異動を行うためのコンテンツCSVファイルを選択します。",
        "コンテンツCSVには異動後のグループ名などを設定してください。"
      ]
    },
    "chorg/run_params": {
      "reservation": [
        "実行する時間を予約できます。"
      ]
    },
    "ckan/addon/server": {
      "ckan_item_url": [
        "アイテムのリンク先URLの共通部分を設定します。",
        "アイテムのnameフィールドがこれに付随してフルのURLとなります。",
        "例：",
        "http://example.jp/a/b/c/<name> をリンク先にしたい場合",
        "http://example.jp/a/b/c を設定します。"
      ],
      "ckan_max_docs": [
        "取得する最大件数を設定します。",
        "0以上の整数値で指定します。"
      ],
      "ckan_url": [
        "URLの可変部分を設定します。",
        "例：",
        "http://example.jp/a/b/c/api/3/action/package_list の利用が想定される場合",
        "http://example.jp/a/b/c を設定します。"
      ]
    },
    "ckan/addon/status": {
      "ckan_status": [
        "APIのアクション部分を設定します。",
        "データセット： package_list",
        "タグ： tag_list",
        "グループ： group_list",
        "関連アイテム： related_list",
        "組織： organization_list"
      ],
      "ckan_url": [
        "URLの可変部分を設定します。",
        "例：",
        "http://example.jp/a/b/c/api/3/action/package_list の利用が想定される場合",
        "http://example.jp/a/b/c を設定します。"
      ],
      "ckan_value_url": [
        "URLを設定しておくと件数部分がそのリンクに変わります。"
      ]
    },
    "ckan/node/page": {
      "loop_html": [
        "自動生成されたページのリスト表示部分のHTMLを指定することが可能です。",
        "下記のように記述します。\n#{id}　CKANデータセットのid。\n#{revision_id}　CKANデータセットのrevision_id。\n#{name}　CKANデータセットのname。\n#{title}　CKANデータセットのtitle。\n#{url}　CKANデータセットへのURL。\n#{summary}　CKANデータセットのnotes。\n#{license_id}　CKANデータセットのlicense_id。\n#{license_title}　CKANデータセットのlicense_title。\n#{license_url}　CKANデータセットのlicense_url。\n#{author}　CKANデータセットのauthor。\n#{author_email}　CKANデータセットのauthor_email。\n#{maintainer}　CKANデータセットのmaintainer。\n#{maintainer_email}　CKANデータセットのmaintainer_email。\n#{num_tags}　CKANデータセットのnum_tags。\n#{num_resources}　CKANデータセットのnum_resources。\n#{private}　CKANデータセットのprivate。\n#{state}　CKANデータセットのstate。\n#{version}　CKANデータセットのversion。\n#{type}　CKANデータセットのtype。\n#{new}　CKANデータセットのmetadata_modifiedがnew_days以内かどうかの結果。\n#{created_date}　CKANデータセットのmetadata_createdを「2015/4/1」の形式で表示します。。\n#{created_date.iso}　CKANデータセットのmetadata_createdを「2015-04-01」の形式で表示します。\n#{created_date.long}　CKANデータセットのmetadata_createdを「2015年4月1日」の形式で表示します。\n#{updated_date}　CKANデータセットのmetadata_modifiedを「2015/4/1」の形式で表示します。\n#{updated_date.iso}　CKANデータセットのmetadata_modifiedを「2015-04-01」の形式で表示します。\n#{updated_date.long}　CKANデータセットのmetadata_modifiedを「2015年4月1日」の形式で表示します。\n#{created_time}　CKANデータセットのmetadata_createdを「2015/4/1 09:08」の形式で表示します。。\n#{created_time.iso}　CKANデータセットのmetadata_createdを「2015-04-01 09:08」の形式で表示します。\n#{created_time.long}　CKANデータセットのmetadata_createdを「2015年4月1日 09時08分」の形式で表示します。\n#{updated_time}　CKANデータセットのmetadata_modifiedを「2015/4/1 09:08」の形式で表示します。。\n#{updated_time.iso}　CKANデータセットのmetadata_modifiedを「2015-04-01 09:08」の形式で表示します。\n#{updated_time.long}　CKANデータセットのmetadata_modifiedを「2015年4月1日 09時08分」の形式で表示します。\n#{group}　リンク先ページの所有グループが表示されます。\n#{groups}　リンク先ページの全ての所有グループが表示されます。\n#{organization}　CKANデータセットのorganization。\n#{add_or_update}　データセットが新規の場合は「add」を、更新の場合は「update」を表示します。\n#{add_or_update_text}　データセットが新規の場合は「データ追加」を、更新の場合は「データ更新」を表示します。\n\n使用例：\n&lt;article class=\"#{class}\">\n  &lt;header>\n    &lt;h2>&lt;a href=\"#{url}\">#{title}&lt;/a>&lt;/h2>\n    &lt;span class=\"#{add_or_update}\">#{add_or_update_text}&lt;/span>\n  &lt;/header>\n  &lt;p>#{summary}&lt;/p>\n&lt;/article>"
      ]
    },
    "cms/addon/additional_info": {
      "field": [
        "追加情報の項目名を入力します。"
      ],
      "value": [
        "項目の内容を入力します。"
      ]
    },
    "cms/addon/archive_view_switcher": {
      "archive_view": [
        "月次表示の場合、リスト表示またはカレンダー表示が選択できます。"
      ]
    },
    "cms/addon/captcha": {
      "captcha": [
        "フォームに画像認証を利用する場合は「使用する」を選択してください。"
      ]
    },
    "cms/addon/child_list": {
      "child_limit": [
        "リストの表示件数を指定します。"
      ],
      "child_list": [
        "#{child_items}などを記述時に表示する子リストについて設定します。"
      ],
      "child_loop_html": [
        "自動生成されたリスト表示部分のHTMLを指定することが可能です。",
        "下記のように記述します。\n#{class}　リンク先のファイル名が表示されます。ファイル名に拡張子がある場合、拡張子を除いた部分が表示されます。\n#{date}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.default}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.iso}　リンク先のページの公開日時が「2015-04-01」の形式で表示されます。\n#{date.long}　リンク先のページの公開日時が「2015年4月1日」の形式で表示されます。\n#{date.short}　リンク先のページの公開日時が「4/1」の形式で表示されます。\n#{time}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.default}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.iso}　リンク先のページの公開日時が「2015-4-1 12:34」の形式で表示されます。\n#{time.long}　リンク先のページの公開日時が「2015年4月1日 12時34分」の形式で表示されます。\n#{time.short}　リンク先のページの公開日時が「15/04/01 12:34」の形式で表示されます。\n#{url}　リンク先ページのURLが表示されます。\n#{name}　リンク先ページのタイトルが表示されます。\n#{index_name}　リンク先ページの一覧用タイトルが表示されます。未設定の場合はタイトルが表示されます。\n#{summary}　リンク先ページのSummaryが表示されます。\n#{html}　リンク先ページの本文が表示されます。\n#{current}　現在訪問しているページとURLが同一の場合、classにcurrentが付与されます。\n#{new}　リンク先のページ公開日時がNEWマーク期間の範囲内の場合、classにnewが付与されます。\n#{id}　リンク先のファイルIDが表示されます。\n#{group}　リンク先ページの所有グループが表示されます。\n#{groups}　リンク先ページの全ての所有グループが表示されます。\n#{img.src}　リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。\n#{categories}　リンク先ページ内がカテゴリに関連付けられている場合、リンク先ページのカテゴリリストが表示されます。\n#{pages.count}　リンク先ページ内にページが存在する場合、リンク先ページ内のページ数が表示されます。\n\n使用例：\n&lt;article class=\"#{class}\">\n  &lt;header>\n    &lt;h2>&lt;a href=\"#{url}\">#{name}&lt;/a>&lt;/h2>\n  &lt;/header>\n  &lt;p>#{summary}&lt;/p>\n&lt;/article>"
      ],
      "child_lower_html": [
        "リスト部分の下部に任意の内容のHTMLを記述することが可能です。"
      ],
      "child_upper_html": [
        "リスト部分の上部に任意の内容のHTMLを記述することが可能です。"
      ]
    },
    "cms/addon/column/layout": {
      "layout": "入力項目のHTMLを設定します。\n未設定の場合、既定の HTML を表示します。\n\n使用例：\n  {% if value.value %}\n    &lt;h2>{{ value.value }}&lt;/h2>\n  {% endif %}"
    },
    "cms/addon/column/select_like": {
      "select_options": [
        "回答の選択肢を入力します。",
        "テキストを改行で区切ることで複数の選択肢を入力することができます。"
      ]
    },
    "cms/addon/column/text_like": {
      "additional_attr": [
        "出力される入力形式のHTMLに属性を追加することが可能です。"
      ],
      "max_length": [
        "入力文字数の最大長を入力します。"
      ],
      "place_holder": [
        "プレースホルダーを入力します。"
      ]
    },
    "cms/addon/crumb": {
      "home_label": [
        "パンくずに表示するサイトトップの名称を記述します。"
      ]
    },
    "cms/addon/default_release_plan": {
      "close_days_before": [
        "公開終了間近の表示日を設定します。",
        "「7 日前」を設定した場合、当日日付から7日前に公開表示間近一覧に表示されるように設定されます。"
      ],
      "default_close_days_after": [
        "公開終了日を設定します。",
        "「1000 日後」を設定した場合、当日日付＋1,000日後の0時0分に公開開始日時が設定されます。"
      ],
      "default_release_days_after": [
        "公開開始日を設定します。",
        "「3 日後」を設定した場合、当日日付＋3日後の0時0分に公開開始日時が設定されます。"
      ],
      "default_release_plan_state": [
        "既定で公開予約を設定するかどうかを選択します。",
        "「無効]を選択している場合、既定で公開予約を設定しません。",
        "「有効]を選択している場合、既定で公開予約開始日と公開予約終了日を設定します。"
      ]
    },
    "cms/addon/editor_setting": {
      "color_button": [
        "文字色変更ボタンの表示を設定します。"
      ],
      "editor_css_path": [
        "エディタ用スタイルシートのパスを設定します。"
      ],
      "syntax_check": [
        "アクセシビリティチェックの有効無効を設定します。"
      ]
    },
    "cms/addon/file": {
      "upload": [
        "本文内に添付ファイルを表示する際に利用します。",
        "アップロードよりファイルをアップロードするかユーザーファイルを利用することが可能です。",
        "本文欄のファイルを添付したい位置にカーソルを合わせ「添付」を選択することで任意の位置にファイルを添付することが可能です。",
        "アップロードしたファイルのチェックボックスにチェックが入っているものは本文の後ろに自動で添付されます。"
      ]
    },
    "cms/addon/for_member_node": {
      "for_member_state": [
        "会員がログインしている時のみ閲覧できるように設定します。"
      ]
    },
    "cms/addon/form/node": {
      "st_form_ids": [
        "フォルダー下で使用する定型フォームを設定します。",
        "設定されていない場合は定型フォームは使用されません。"
      ]
    },
    "cms/addon/form/page": {
      "form_id": [
        "定型フォームを設定します。"
      ]
    },
    "cms/addon/import/group": {
      "in_file": [
        "CSVファイルを指定しグループのインポートを行います。",
        "idが記述されていない行は新規作成になります。",
        "グループ名が記述されていない行は無効状態となります。"
      ]
    },
    "cms/addon/import/user": {
      "in_file": [
        "CSVファイルを指定しユーザーのインポートを行います。",
        "idが記述されていない行は新規作成になります。",
        "メールアドレスとユーザーIDが記述されていない行のユーザーは無効状態となります。"
      ]
    },
    "cms/addon/layout_html": {
      "html": "レイアウトのHTMLを記述します。\n下記のテンプレートが使用可能です。\n\n{{ yield }}\n本文の呼び出しが行われます。\n{{ part \"パーツのファイル名（拡張子は除く）\" }}\nパーツの呼び出しが行われます。\n\n#{page_name}\nページやフォルダーに設定しているタイトルが表示されます。\n#{page_released}\nページの公開日時が「2015/4/1」の形式で表示されます。\n#{page_released.default}\nページの公開日時が「2015/4/1」の形式で表示されます。\n#{page_released.iso}\nページの公開日時が「2015-04-01」の形式で表示されます。\n#{page_released.long}\nページの公開日時が「2015年4月1日」の形式で表示されます。\n#{page_released.short}\nページの公開日時が「4/1」の形式で表示されます。\n#{page_updated}\nページの更新日時が「2015/4/1」の形式で表示されます。\n#{page_updated.default}\nページの更新日時が「2015/4/1」の形式で表示されます。\n#{page_updated.iso}\nページの更新日時が「2015-04-01」の形式で表示されます。\n#{page_updated.long}\nページの更新日時が「2015年4月1日」の形式で表示されます。\n#{page_updated.short}\nページの更新日時が「4/1」の形式で表示されます。\n\n&lt;!-- skip-voice --&gt;&lt;div&gt;読み上げない&lt;/div&gt;&lt;!-- end-skip-voice --&gt;\nコメントアウトで囲われた個所の読み上げをスキップします。\n\n&lt;nav class=\"ss-adobe-reader\" style=\"display: none\"&gt;Adobe Reader&lt;/nav&gt;\nページ内にPDFファイルがある場合にAdobe Readerのダウンロード案内が表示されます。\n\n&lt;footer id=\"ss-pc\" style=\"display: none\"&gt;PC表示&lt;/footer&gt;\n&lt;footer id=\"ss-mb\" style=\"display: none\"&gt;スマートフォン表示&lt;/footer&gt;\nスマートフォンやタブレットで表示した際にPC、スマートフォン表示を切り替えるボタンを表示します。\n\n#{if 条件分岐タグA}内容A#{end} 条件分岐タグAがtrueのとき、内容Aを表示します。\n#{if 条件分岐タグA}内容A#{elsif 条件分岐タグB}内容B#{end} 条件分岐タグAがtrueの場合は内容A、条件分岐タグAがfalseかつ条件分岐タグBがtrueの場合は内容Bを表示します。\n#{if 条件分岐タグA}内容A#{else}内容B#{end} 条件分岐タグAがtrueの場合は内容A、falseの場合は内容Bを表示します。\n\n条件分岐タグ:\n- is_page() ページならばtrue, それ以外はfalseを返します。\n- is_node() フォルダーならばtrue, それ以外はfalseを返します。\n- in_node('/docs') ファイル名がdocsから始まるならばtrue, それ以外はfalseを返します。\n- has_pages() 現在のフォルダーにページがある、または現在のフォルダーのカテゴリーに所属しているならばtrue, それ以外はfalseを返します。"
    },
    "cms/addon/list/model": {
      "conditions": [
        "自フォルダー内のリスト以外で表示するリストのフォルダー名を記述します。",
        "改行することで複数のファルダーを指定することが可能です。\n例：\noshirase\noshirase/event\nshisei/jinji"
      ],
      "limit": [
        "リストの表示件数を指定します。"
      ],
      "loop_format": [
        "ループHTML形式の形式を選択します。",
        null,
        "SHIRASAGI: シラサギ形式で上部 HTML, ループ HTML, 下部 HTMLを記述します。",
        "Liquid: Liquid 形式でループ HTML を記述します。"
      ],
      "loop_html": [
        "自動生成されたリスト表示部分のHTMLを指定することが可能です。",
        "ループHTMLを選択または直接記入することが可能です。",
        "下記のように記述します。\n#{class}　リンク先のファイル名が表示されます。ファイル名に拡張子がある場合、拡張子を除いた部分が表示されます。\n#{date}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.default}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.iso}　リンク先のページの公開日時が「2015-04-01」の形式で表示されます。\n#{date.long}　リンク先のページの公開日時が「2015年4月1日」の形式で表示されます。\n#{date.short}　リンク先のページの公開日時が「4/1」の形式で表示されます。\n#{time}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.default}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.iso}　リンク先のページの公開日時が「2015-4-1 12:34」の形式で表示されます。\n#{time.long}　リンク先のページの公開日時が「2015年4月1日 12時34分」の形式で表示されます。\n#{time.short}　リンク先のページの公開日時が「15/04/01 12:34」の形式で表示されます。\n#{url}　リンク先ページのURLが表示されます。\n#{name}　リンク先ページのタイトルが表示されます。\n#{index_name}　リンク先ページの一覧用タイトルが表示されます。未設定の場合はタイトルが表示されます。\n#{summary}　リンク先ページのSummaryが表示されます。\n#{html}　リンク先ページの本文が表示されます。\n#{current}　現在訪問しているページとURLが同一の場合、classにcurrentが付与されます。\n#{new}　リンク先のページ公開日時がNEWマーク期間の範囲内の場合、classにnewが付与されます。\n#{id}　リンク先のファイルIDが表示されます。\n#{group}　リンク先ページの所有グループが表示されます。\n#{groups}　リンク先ページの全ての所有グループが表示されます。\n#{img.src}　リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。\n#{categories}　リンク先ページ内がカテゴリに関連付けられている場合、リンク先ページのカテゴリリストが表示されます。\n#{pages.count}　リンク先ページ内にページが存在する場合、リンク先ページ内のページ数が表示されます。\n#{tags} リンク先ページのタグが表示されます。\n#{child_items} フォルダー内のフォルダーやページが子リストで表示されます。\n#{category_nodes} フォルダー内のカテゴリーフォルダーが子リストで表示されます。\n#{category_pages} カテゴリーが設定されたページが子リストで表示されます。\n#{child_nodes} フォルダー内のフォルダーが子リストで表示されます。\n#{child_pages} フォルダー内のページが子リストで表示されます。"
      ],
      "loop_liquid": [
        "Liquid 形式で記述します。",
        "使用例：\n{% for page in pages %}\n&lt;article class=\"item-{{ page.css_class }} {% if page.new? %}new{% endif %} {% if page.current? %}current{% endif %}\">\n  &lt;header>\n    &lt;time datetime=\"{{ page.date }}\">{{ page.date | ss_date: \"long\" }}&lt;/time>\n    &lt;h2>&lt;a href=\"{{ page.url }}\">{{ page.index_name }}&lt;/a>&lt;/h2>\n  &lt;/header>\n  &lt;p>#{summary}&lt;/p>\n&lt;/article>\n{% endfor %}"
      ],
      "lower_html": [
        "リスト部分の下部に任意の内容のHTMLを記述することが可能です。",
        "上部HTMLと同じテンプレートが使用できます。"
      ],
      "new_days": [
        "設定した期間内に作成されたページへのリンクにNEWマークを付与するためのclassがふられます。"
      ],
      "no_items_display_state": [
        "ページが見つからない時、上部HTMLと下部HTMLを表示するか設定できます。"
      ],
      "sort": [
        "どういった順でリストの並べるかを指定します。",
        "タイトル、ファイル名、作成日時、更新日時、公開日時での並び順は昇順です。",
        "指定順での並び順は降順です"
      ],
      "substitute_html": [
        "ページが見つからない時、ループHTMLの代わりに表示するHTMLを記述することが可能です。"
      ],
      "upper_html": [
        "リスト部分の上部に任意の内容のHTMLを記述することが可能です。",
        "#{parent_name} 親フォルダーの名前が表示されます。\n#{parent.parent_name} 親フォルダーの親フォルダー名が表示されます。\n#{part_name} 現在のパーツの名前が表示されます。\n#{part_parent_name} 現在のパーツの親フォルダー名が表示されます。\n#{part_parent.parent_name} 現在のパーツの親フォルダーの親フォルダー名が表示されます。\n\n#{if 条件分岐タグA}内容A#{end} 条件分岐タグAがtrueのとき、内容Aを表示します。\n#{if 条件分岐タグA}内容A#{elsif 条件分岐タグB}内容B#{end} 条件分岐タグAがtrueの場合は内容A、条件分岐タグAがfalseかつ条件分岐タグBがtrueの場合は内容Bを表示します。\n#{if 条件分岐タグA}内容A#{else}内容B#{end} 条件分岐タグAがtrueの場合は内容A、falseの場合は内容Bを表示します。\n\n条件分岐タグ:\n- is_page() ページならばtrue, それ以外はfalseを返します。\n- is_node() フォルダーならばtrue, それ以外はfalseを返します。\n- in_node('/docs') ファイル名がdocsから始まるならばtrue, それ以外はfalseを返します。\n- has_pages() 現在のフォルダーにページがある、または現在のフォルダーのカテゴリーに所属しているならばtrue, それ以外はfalseを返します。\n\n使用例：\n&lt;article class=\"#{class}\">\n  &lt;header>\n    &lt;h2>&lt;a href=\"#{url}\">#{name}&lt;/a>&lt;/h2>\n  &lt;/header>\n  &lt;p>#{summary}&lt;/p>\n&lt;/article>"
      ]
    },
    "cms/addon/max_file_size_setting": {
      "max_file_size_setting": [
        "フォルダー内のページ編集時に「ファイル>アップロード」から添付ファイルをアップする際のサイズ制限を設定可能です。"
      ]
    },
    "cms/addon/monthly_nav": {
      "periods": [
        "アーカイブナビで表示する期間を設定します。"
      ]
    },
    "cms/addon/node_auto_post_setting": {
      "node_edit_auto_post": [
        "記事編集時の自動投稿の設定を行います。"
      ],
      "node_sns_auto_delete": [
        "記事非公開時にSNSへ投稿した内容を削除します。"
      ],
      "node_twitter_auto_post": [
        "Twitterへの自動投稿の設定を行います。"
      ]
    },
    "cms/addon/opendata_ref/area": {
      "opendata_area_ids": [
        "ページをオープンデータとして登録する際、どの地域を使用するかを設定します。",
        "設定した地域がデータセットに設定されます。"
      ]
    },
    "cms/addon/opendata_ref/category": {
      "opendata_category_ids": [
        "ページをオープンデータとして登録する際、どの分野を使用するかを設定します。",
        "設定した分野がデータセットに設定されます。"
      ]
    },
    "cms/addon/opendata_ref/dataset": {
      "opendata_dataset_state": [
        "ページをオープンデータとして登録するかどうかを選択します。"
      ]
    },
    "cms/addon/opendata_ref/dataset_group": {
      "opendata_dataset_group_ids": [
        "ページをオープンデータとして登録する際、どのデータセット・グループを使用するかを設定します。",
        "設定したデータセット・グループがデータセットに設定されます。"
      ]
    },
    "cms/addon/opendata_ref/license": {
      "opendata_license_ids": [
        "ページをオープンデータとして登録する際、どのライセンスを使用するかを設定します。",
        "設定したライセンスがデータセット内のリソースに設定されます。"
      ]
    },
    "cms/addon/opendata_ref/site": {
      "opendata_site_ids": [
        "オープンデータサイトを設定します。",
        "設定したサイトのデータセットにページが連携されるようになります。"
      ]
    },
    "cms/addon/page_group_list": {
      "conditions": [
        "表示するリストのフォルダー名を記述します。",
        "設定されていない場合、すべてのフォルダーからページを検索します。",
        "改行することで複数のファルダーを指定することが可能です。\n例：\noshirase\noshirase/event\nshisei/jinji"
      ]
    },
    "cms/addon/page_search": {
      "search_approved": [
        "検索したい承認日時の範囲を入力します。"
      ],
      "search_approver_state": [
        "検索したいページの承認ステータスを選択します。"
      ],
      "search_category_ids": [
        "検索したいカテゴリーを選択します。",
        "いずれかのカテゴリーに該当するページが検索されます。"
      ],
      "search_filename": [
        "検索したいファイル名を入力します。"
      ],
      "search_first_released": [
        "検索したいページの公開ステータスを選択します。"
      ],
      "search_group_ids": [
        "検索したい管理グループを選択します。",
        "いずれかのグループに該当するページが検索されます。"
      ],
      "search_keyword": [
        "検索したいキーワードを入力します。",
        "ページ本文等にヒットします。"
      ],
      "search_name": [
        "検索したいページタイトルを入力します。"
      ],
      "search_node_ids": [
        "検索したいフォルダーを選択します。",
        "いずれかのフォルダー配下に存在するページが検索されます。"
      ],
      "search_released": [
        "検索したい公開日時の範囲を入力します。"
      ],
      "search_routes": [
        "検索したいページ属性を選択します。",
        "いずれかのページ属性に該当するページが検索されます。"
      ],
      "search_sort": [
        "検索結果のページ並び順を選択します。",
        "指定が無い場合、ファイル名での並び順となります。"
      ],
      "search_state": [
        "検索したいページのステータスを選択します。"
      ],
      "search_updated": [
        "検索したい更新日時の範囲を入力します。"
      ],
      "search_user_ids": [
        "検索したい作成者（ユーザー）を選択します。",
        "いずれかのユーザーが作成者に該当するページが検索されます。"
      ]
    },
    "cms/addon/parent_crumb": {
      "parent_crumb_urls": [
        "親フォルダーのURLを記述します。",
        "設定しているカテゴリーから選択することも可能です。"
      ]
    },
    "cms/addon/readable_setting": {
      "readable_group_ids": [
        "閲覧を許可するグループを選択します。"
      ],
      "readable_member_ids": [
        "閲覧を許可するユーザーを選択します。"
      ],
      "readable_setting_range": [
        "<b>全公開</b> - 誰でも閲覧できます。",
        "<b>選択範囲</b> - 選択した対象のみ閲覧できます。"
      ]
    },
    "cms/addon/related_page": {
      "related_page_ids": [
        "このページの内容に関連するページへのリンクを選択します。",
        "選択したページへのリンクが本文の下部に表示されます。"
      ],
      "related_page_sort": [
        "関連記事の並び順を選択します。"
      ]
    },
    "cms/addon/role": {
      "cms_role_ids": [
        "ユーザーのロール/権限を選択します。"
      ]
    },
    "cms/addon/sns_poster": {
      "edit_auto_post": [
        "記事編集時の自動投稿の設定を行います。"
      ],
      "sns_auto_delete": [
        "記事非公開時にSNSへ投稿した内容を削除します。"
      ],
      "twitter_auto_post": [
        "Twitterへの自動投稿の設定を行います。"
      ]
    },
    "cms/addon/source_cleaner": {
      "action": [
        "対象のクリーニング方法を設定します。",
        "置換または削除が選択できます。",
        "置換後のタグや属性の値、文字列を右欄に入力します。"
      ],
      "target": [
        "クリーニングの対象を設定します。",
        "タグ、属性、文字列の中から種別を選択し、右欄に対象を入力します。"
      ]
    },
    "cms/addon/tabs": {
      "conditions": [
        "タブ分けで表示するリストのフォルダー名を記述します。",
        "改行することで複数のファルダーを指定することが可能です。\n例：\noshirase\noshirase/event\nshisei/jinji"
      ],
      "limit": [
        "リストの表示件数を指定します。"
      ],
      "new_days": [
        "設定した期間内に作成されたページへのリンクにNEWマークを付与するためのclassがふられます。"
      ]
    },
    "cms/addon/tag": {
      "tags": [
        "ページのタグを設定します。",
        "スペースやカンマで区切ることで複数のタグを設定できます。"
      ]
    },
    "cms/addon/tag_setting": {
      "st_tags": [
        "ページに設定可能なタグを設定します。",
        "スペースやカンマで区切ることで複数のタグを設定できます。"
      ]
    },
    "cms/addon/thumb": {
      "thumb_id": [
        "サムネイル画像を指定します。"
      ]
    },
    "cms/body_layout": {
      "name": [
        "本文レイアウト名を入力します。",
        "日本語での入力が可能です。"
      ],
      "parts": [
        "本文レイアウトにて展開するパーツ名を入力します。",
        "複数のパーツ名を改行区切りで記述してください。"
      ]
    },
    "cms/column/base": {
      "name": [
        "入力項目名を入力します。"
      ],
      "order": [
        "表示順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "required": [
        "項目の入力が必須か任意かを選択します。"
      ],
      "tooltips": [
        "項目のツールチップを入力します。"
      ]
    },
    "cms/column/date_field": {
      "html_additional_attr": [
        "公開側のHTMLタグの追加属性を指定します。"
      ],
      "html_tag": [
        "公開側のHTMLタグを選択します。"
      ],
      "layout": "入力項目のHTMLを設定します。\n未設定の場合、既定の HTML を表示します。\n\n使用例：\n  {% if value.date %}\n    &lt;span>{{ value.date | date: \"%Y年%1m月%1d日\" }}&lt;/span>\n  {% endif %}",
      "place_holder": [
        "プレースホルダーを入力します。"
      ]
    },
    "cms/column/file_upload": {
      "html_additional_attr": [
        "公開側のHTMLタグの追加属性を指定します。"
      ],
      "html_tag": [
        "公開側のHTMLタグを選択します。"
      ],
      "label_max_length": [
        "リンクテキストの最大長を入力します。"
      ],
      "label_place_holder": [
        "リンクテキストのプレースホルダーを入力します。"
      ],
      "layout": "入力項目のHTMLを Liquid 形式で設定します。\n未設定の場合、既定の HTML を表示します。\n\n使用例（ファイルアップロードの場合）：\n  {% if value.file %}\n    {% if value.image? %}\n      &lt;a href=\"{{ value.file.url }}\">&lt;img src=\"{{ value.file.thumb_url }}\" alt=\"{{ value.image_text | default: value.file.humanized_name }}\" title=\"{{ value.file.basename }}\">&lt;/a>\n    {% else %}\n      &lt;a href=\"{{ value.file.url }}\">{{ value.attachment_text | default: value.file.humanized_name }}&lt;/a>\n    {% endif %}\n  {% endif %}"
    },
    "cms/column/list": {
      "list_type": [
        "種類を選択します。"
      ]
    },
    "cms/column/select": {
      "place_holder": [
        "プレースホルダーを入力します。"
      ]
    },
    "cms/column/text_area": {
      "layout": "入力項目のHTMLを設定します。\n未設定の場合、既定の HTML を表示します。\n\n使用例：\n  {% if value.value %}\n    &lt;p>{{ value.value | newline_to_br }}&lt;/p>\n  {% endif %}"
    },
    "cms/column/text_field": {
      "input_type": [
        "種類を選択します。",
        "一部の種類は、最近のブラウザでしかサポートされていません。"
      ]
    },
    "cms/column/url_field": {
      "html_additional_attr": [
        "公開側のHTMLタグの追加属性を指定します。"
      ],
      "html_tag": [
        "公開側のHTMLタグを選択します。"
      ],
      "layout": "入力項目のHTMLを設定します。\n未設定の場合、既定の HTML を表示します。\n\n使用例：\n  {% if value.link %}\n    {% if value.label %}\n      &lt;a href=\"{{ value.link }}\">{{ value.label }}&lt;/a>\n    {% else %}\n      &lt;a href=\"{{ value.link }}\">{{ value.link }}&lt;/a>\n    {% endif %}\n  {% endif %}"
    },
    "cms/column/url_field2": {
      "html_additional_attr": [
        "公開側のHTMLタグの追加属性を指定します。"
      ],
      "html_tag": [
        "公開側のHTMLタグを選択します。"
      ],
      "label_max_length": [
        "リンクテキストの最大長を入力します。"
      ],
      "label_place_holder": [
        "リンクテキストのプレースホルダーを入力します。"
      ],
      "layout": "入力項目のHTMLを設定します。\n未設定の場合、既定の HTML を表示します。\n\n使用例：\n  {% if value.link %}\n    {% if value.label %}\n      &lt;a href=\"{{ value.link }}\">{{ value.label }}&lt;/a>\n    {% else %}\n      &lt;a href=\"{{ value.link }}\">{{ value.link }}&lt;/a>\n    {% endif %}\n  {% endif %}",
      "link_max_length": [
        "リンクURLの最大長を入力します。"
      ],
      "link_place_holder": [
        "リンクURLのプレースホルダーを入力します。"
      ]
    },
    "cms/command": {
      "command": [
        "コマンドを入力します。\nコマンドを実行する箇所に応じて引数が追加されます。\n\n第一引数：\nsite　サイト設定からコマンドを実行した場合に追加されます。\nfolder　フォルダー取り込み、フォルダー書き込みからコマンドを実行した場合に追加されます。\npage　ページ取り込みからコマンドを実行した場合に追加されます。\n\n第二引数：\n第一引数に応じた同期対象のパス\n\nコマンド例：\necho\n\n実行例：\nsite /var/www/shirasagi/public/sites/w/w/w/_"
      ],
      "description": [
        "コマンドの説明を入力します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "order": [
        "コマンドの並び順に利用します。",
        "数字が小さいほど一覧ページの上位にリンクが表示されます。"
      ],
      "output": [
        "コマンドを並び順の通りに実行します。"
      ]
    },
    "cms/editor_template": {
      "description": [
        "テンプレートの説明を入力します。"
      ],
      "name": [
        "テンプレート名を入力します。",
        "日本語での入力が可能です。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "thumb_id": [
        "サムネイル画像を指定します。",
        "サムネイル画像は、ご使用のエディターが CKEditor の場合にのみ表示されます。"
      ]
    },
    "cms/form": {
      "column_ids": [
        "定型フォームのコラムを設定します。"
      ],
      "html": "定型フォームのHTMLを Liquid 形式で設定します。\n{{ values[\"項目名\"] }}のように記述することで該当する項目の入力値を表示します。\n\n使用例：\n  &lt;dl>\n    &lt;dt>項目&lt;/dt>\n    &lt;dd>{{ values[\"項目名1\"] }}&lt;/dd>\n    &lt;dt>項目&lt;/dt>\n    &lt;dd>{{ values[\"項目名2\"] }}&lt;/dd>\n  &lt;/dl>",
      "name": [
        "テンプレート名を入力します。",
        "日本語での入力が可能です。"
      ],
      "sub_type": [
        "「定型フォーム」を選択すると、定型フォーム型の入力画面を表示しますので、ユーザーは予め決められた入力項目を入力することで記事を作成することが可能となります。",
        null,
        "「ブロック型」を選択すると、ブロック型入力画面を表示しますので、ユーザーが自由に入力項目を組み合わせて記事を作成することが可能となります。"
      ]
    },
    "cms/import_job_file": {
      "basename": [
        "トップへのフォルダー取り込みの場合、インポート前にフォルダーを作成し、内部にファイルを展開します。",
        "フォルダー名を設定します。"
      ],
      "import_date": [
        "インポートを実行する日時を設定できます。"
      ],
      "in_file": [
        "取り込むファイルを設定します。",
        "ルートフォルダーが含まれるZIPファイルもしくは単一のHTMLファイルを選択してください。",
        "フォルダー配下に 取り込みページ、フォルダー、アップロードファイル として展開されます。",
        "ファイル名は全て半角英数とする必要があります。",
        "HTMLファイルはutf-8でエンコードされている必要があります。"
      ],
      "title": [
        "トップへのフォルダー取り込みの場合、インポート前にフォルダーを作成し、内部にファイルを展開します。",
        "フォルダーのタイトルを設定します。"
      ]
    },
    "cms/init_column": {
      "order": [
        "表示順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ]
    },
    "cms/layout": {
      "basename": [
        "レイアウトのファイル名を入力します。",
        "半角英数字で入力してください。",
        ".htmlなどの拡張子の記述は不要です。"
      ],
      "name": [
        "レイアウト名を入力します。",
        "日本語での入力が可能です。"
      ]
    },
    "cms/model/node": {
      "condition_groups": [
        "検索条件に所属グループを含めます。"
      ],
      "conditions": [
        "自フォルダー内のリスト以外で表示するリストのフォルダー名を記述します。",
        "改行することで複数のファルダー指定することが可能です。\n例：\noshirase\noshirase/event\nshisei/jinji"
      ],
      "destination_filename": [
        "ページやフォルダーを移動します。",
        "移動先をフルパスで設定します。"
      ],
      "foldername": [
        "フォルダー名はURLに利用します。",
        "半角英数字で入力します。",
        ".htmlなどの拡張子の記述は不要です。"
      ],
      "layout_id": [
        "フォルダーのレイアウトを選択します。"
      ],
      "limit": [
        "リストの表示件数を指定します。\n指定件数を超えるとページネーションが生成されます。"
      ],
      "loop_html": [
        "自動生成されたページのリスト表示部分のHTMLを指定することが可能です。",
        "ループHTMLを選択または直接記入することが可能です。",
        "下記のように記述します。\n#{class}　リンク先のファイル名が表示されます。ファイル名に拡張子がある場合、拡張子を除いた部分が表示されます。\n#{class_categories} リンク先ページ内がカテゴリに関連付けられている場合、全てのカテゴリのフォルダ名が表示されます。\n#{date}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.default}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.iso}　リンク先のページの公開日時が「2015-04-01」の形式で表示されます。\n#{date.long}　リンク先のページの公開日時が「2015年4月1日」の形式で表示されます。\n#{date.short}　リンク先のページの公開日時が「4/1」の形式で表示されます。\n#{time}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.default}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.iso}　リンク先のページの公開日時が「2015-4-1 12:34」の形式で表示されます。\n#{time.long}　リンク先のページの公開日時が「2015年4月1日 12時34分」の形式で表示されます。\n#{time.short}　リンク先のページの公開日時が「15/04/01 12:34」の形式で表示されます。\n#{url}　リンク先ページのURLが表示されます。\n#{name}　リンク先ページのタイトルが表示されます。\n#{summary}　リンク先ページのSummaryが表示されます。\n#{html}　リンク先ページの本文が表示されます。\n#{current}　現在訪問しているページとURLが同一の場合、classにcurrentが付与されます。\n#{new}　リンク先のページ公開日時がNEWマーク期間の範囲内の場合、classにnewが付与されます。\n#{id}　リンク先のファイルIDが表示されます。\n#{group}　リンク先ページの所有グループが表示されます。\n#{groups}　リンク先ページの全ての所有グループが表示されます。\n#{img.src}　リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。\n#{thumb.src}　リンク先ページ内のサムネイル画像が表示されます。サムネイル画像が指定されていない場合は、#{img.src}に準じます。\n#{categories}　リンク先ページ内がカテゴリに関連付けられている場合、リンク先ページのカテゴリリストが表示されます。\n#{pages.count}　リンク先ページ内にページが存在する場合、リンク先ページ内のページ数が表示されます。\n#{tags} リンク先ページののタグが表示されます。\n\n使用例：\n&lt;article class=\"#{class}\">\n  &lt;header>\n    &lt;h2>&lt;a href=\"#{url}\">#{name}&lt;/a>&lt;/h2>\n  &lt;/header>\n  &lt;p>#{summary}&lt;/p>\n&lt;/article>"
      ],
      "lower_html": [
        "自動生成されたページの内容の下部に任意の内容のHTMLを記述することが可能です。"
      ],
      "page_layout_id": [
        "ページのレイアウトを選択します。",
        "初期値は上位のフォルダの設定を継承しています。"
      ],
      "route": [
        "設定した属性に応じたページ(index.html)が自動で生成されます。",
        "広告管理/広告バナー\n広告バナーを管理するフォルダーです。",
        "記事/記事リスト\nフォルダー内の記事ページ一覧を表示します。",
        "カテゴリー/カテゴリーリスト\nファルダー属性「カテゴリー」を設定したフォルダー一覧を表示します。",
        "カテゴリー/ページリスト\nカテゴリーが設定されているページ一覧を表示します。",
        "標準機能/フォルダーリスト\nフォルダー内のフォルダー一覧を表示します。",
        "標準機能/ページリスト\nフォルダー内のページ一覧を表示します。",
        "イベント/イベントリスト\nイベント日付が設定されたページ一覧をカレンダー形式で表示します。",
        "メールマガジン/配信記事一覧\nメールマガジンの配信登録、変更、停止画面の表示します。",
        "メールマガジン/バックナンバー\nメールマガジンのバックナンバー一覧を表示します。",
        "施設/施設リスト\nフォルダー内の施設情報一覧を表示します。",
        "施設/施設情報\n施設情報を表示します。\\nテキスト情報に加え、画像、地図の登録が可能です。",
        "施設/施設の種類\n種類で絞り込んだ施設情報一覧を表示します。",
        "施設/施設の用途\n用途で絞り込んだ施設情報一覧を表示します。",
        "施設/施設のある地域\n地域で絞り込んだ施設情報一覧を表示します。",
        "施設/施設検索\n施設情報の検索画面を表示します。",
        "FAQ/FAQ記事リスト\nフォルダー内のFAQ記事一覧を表示します。",
        "FAQ/FAQ記事検索\nFAQ記事の検索画面を表示します。",
        "メールフォーム/フォーム\nメールフォームを表示します。",
        "メールフォーム/フォーム一覧\nフォルダー内のメールフォーム一覧を表示します。",
        "メンバー/ログイン\nメンバーのログイン画面を表示します。",
        "RSS/RSS取込\n指定したRSSから取り込んだページ一覧を表示します。",
        "サイトマップ/サイトマップ\nサイトマップを表示します。",
        "アップローダー/アップローダー\nファイルをアップロードするためのフォルダです。",
        "緊急災害レイアウト/緊急災害レイアウト\n緊急災害時にレイアウトを切り替えるためのフォルダです。"
      ],
      "shortcut": [
        "表示を選択することで管理画面のサイトトップ「コンテンツ」に表示されます。"
      ],
      "sort": [
        "どういった順でリストを並べるかを指定します。",
        "タイトル、ファイル名、作成日時、更新日時、公開日時での並び順は昇順です。",
        "指定順での並び順は降順です"
      ],
      "st_categories": [
        "フォルダー下で使用するカテゴリーを設定します。",
        "設定されていない場合は全カテゴリーが対象となります。"
      ],
      "upper_html": [
        "自動生成されたページの内容の上部に任意の内容のHTMLを記述することが可能です。"
      ],
      "view_route": [
        "サイトトップ「コンテンツ」から遷移したときの「モジュール」を設定します。"
      ]
    },
    "cms/model/page": {
      "destination_filename": [
        "ページやフォルダーを移動します。",
        "移動先をフルパスで設定します。",
        "例：docs/001.html"
      ]
    },
    "cms/model/part": {
      "ajax_view": [
        "パーツを動的に表示するか否かを選択します。"
      ],
      "basename": [
        "パーツのファイル名を入力します。",
        "半角英数字で入力します。",
        ".htmlなどの拡張子の記述は不要です。"
      ],
      "mobile_view": [
        "携帯画面で表示するか否かを選択します。"
      ],
      "name": [
        "パーツ名を入力します。",
        "日本語での入力が可能です。"
      ],
      "route": [
        "広告管理/広告バナー\n広告バナーフォルダーに登録されている広告バナーを表示します。",
        "記事/記事リスト\nフォルダー内の記事リストを表示します。",
        "カテゴリー/カテゴリーリスト\n自フォルダーと同階層にあるカテゴリーを表示します。",
        "標準機能/HTML記述\nHTMLを自由に入力することが可能です。",
        "標準機能/フォルダーリスト\nフォルダー内のフォルダーリストを表示します。",
        "標準機能/ページリスト\nフォルダー内のページリストを表示します。",
        "標準機能/新着タブ\n複数の記事リストをタブ分けで表示します。",
        "標準機能/パンくずリスト\nパンくずリストを自動生成します。",
        "標準機能/SNSシェアボタン\nfacebook、Twitter等のSNSシェアボタンを表示します。",
        "イベント/カレンダー\nイベントカレンダーを表示します。",
        "FAQ/FAQ記事検索\nFAQ記事検索欄を表示します。"
      ]
    },
    "cms/notice": {
      "name": [
        "タイトルを入力します。"
      ],
      "notice_severity": [
        "「重要なお知らせ」の場合、チェックをつけます。",
        "「重要なお知らせ」にチェックをつけた場合、コンテンツ内の先頭に目立つ色で表示されます。"
      ],
      "notice_target": [
        "「全ユーザー」に表示するか、「ログイン画面」にも表示するか「管理グループ」のみに表示するかを選択します。",
        "「ログイン画面」を選択した場合、ログイン画面でもお知らせが表示されます。",
        "「管理グループ」を選択した場合、「管理グループ」欄に設定したグループに表示されます。"
      ]
    },
    "cms/page_search": {
      "name": [
        "名前を入力します。",
        "入力した名前がナビビューに表示されます。"
      ],
      "order": [
        "並び順を入力します。",
        "入力した順でナビビューに表示されます。"
      ]
    },
    "cms/role": {
      "permission_level": [
        "権限レベルを設定します。",
        "数字が大きいほど強い権限になります。"
      ]
    },
    "cms/site": {
      "auto_description": [
        "ページ、フォルダー保存時にメタ情報の概要を入力しない場合、自動で入力するかを選択します。",
        "自動入力される概要は本文から生成されます。"
      ],
      "auto_keywords": [
        "ページ、フォルダー保存時にメタ情報のキーワードを入力しない場合、自動で入力するかを選択します。",
        "自動入力されるキーワードは親フォルダー名と設定カテゴリー名から生成されます。"
      ],
      "domains": [
        "サイトのドメインを入力します。"
      ],
      "host": [
        "ホスト名を入力します。"
      ],
      "keywords": [
        "キーワード自動設定が有効時にこの項目が自動入力に追加されます。"
      ],
      "max_name_length": [
        "ページタイトルの文字数設定の最大テキスト長を設定します。"
      ],
      "mypage_domain": [
        "マイページドメインを入力します。"
      ],
      "mypage_scheme": [
        "マイページスキームを入力します。"
      ],
      "name": [
        "サイト名を入力します。"
      ]
    },
    "cms/theme_template": {
      "background_color": [
        "背景色を設定します。"
      ],
      "class_name": [
        "Theme切り替えリンクのclass属性を入力します。",
        "一意な値である必要があります。"
      ],
      "css_path": [
        "Theme切り替え時に読み込むcssファイルのパスを入力します。"
      ],
      "font_color": [
        "文字色を設定します。"
      ],
      "high_contrast_mode": [
        "ハイコントラストモードの有効/無効を入力します。",
        "設定を有効にするとTheme切り替え時に、文字色と背景色のstyleを表示HTMLに埋め込みます。"
      ],
      "name": [
        "名前を入力します。",
        "Theme切り替えリンクのテキストとして表示されます。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "state": [
        "公開状態を入力します。"
      ]
    },
    "cms/word_dictionary": {
      "body": [
        "表記と置換後の表記をカンマで区切って入力します（CSV 形式で入力します）。",
        "単語を改行で区切って複数個入力することができます。",
        "",
        "入力例：\n子供, 子ども"
      ],
      "name": [
        "辞書の名前を入力します。"
      ]
    },
    "contact/addon/group": {
      "contact_email": [
        "グループのメールアドレスを記入します。",
        "ページ作成時に連絡先として自動で挿入されます。"
      ],
      "contact_fax": [
        "グループのファックス番号を記入します。",
        "ページ作成時に連絡先として自動で挿入されます。"
      ],
      "contact_link_name": [
        "グループのリンク名を記入します。",
        "ページ作成時に連絡先として自動で挿入されます。"
      ],
      "contact_link_url": [
        "グループのリンクURLを記入します。",
        "ページ作成時に連絡先として自動で挿入されます。"
      ],
      "contact_tel": [
        "グループの電話番号を記入します。",
        "ページ作成時に連絡先として自動で挿入されます。"
      ]
    },
    "contact/addon/page": {
      "contact_charge": [
        "連絡先に表示する担当者名または部署名を記入します。"
      ],
      "contact_email": [
        "連絡先に表示する部署または担当者のメールアドレスを記入します。"
      ],
      "contact_fax": [
        "連絡先に表示する部署のファックス番号を記入します。"
      ],
      "contact_group_id": [
        "連絡先に表示する担当部署を選択します。"
      ],
      "contact_link_name": [
        "連絡先に表示する部署のリンク名を記入します。"
      ],
      "contact_link_url": [
        "連絡先に表示する部署のリンクURLを記入します。"
      ],
      "contact_state": [
        "公開画面への表示、非表示を選択します。"
      ],
      "contact_tel": [
        "連絡先に表示する部署または担当者の電話番号を記入します。"
      ]
    },
    "event/addon/body": {
      "contact": [
        "イベントの連絡先を入力します。"
      ],
      "content": [
        "イベントの内容を入力します。"
      ],
      "cost": [
        "イベント参加に必要な費用を入力します。"
      ],
      "related_url": [
        "イベントの関連URLを入力します。"
      ],
      "schedule": [
        "イベントの日時をテキスト形式で入力します。"
      ],
      "venue": [
        "イベントの開催場所を入力します。"
      ]
    },
    "event/addon/calendar_list": {
      "event_display": [
        "イベントカレンダーの表示形式を指定します。"
      ]
    },
    "event/addon/date": {
      "event_dates": [
        "イベントページにリンクを表示する場合はイベントの期間を入力します。",
        "「日付フォームを追加する」を選択することで複数の期間を設定することが可能です。"
      ],
      "event_deadline": [
        "イベントの申し込み締切日を入力します。"
      ],
      "event_name": [
        "イベントページに表示するリンクのタイトルを記入します。",
        "入力しない場合はこのページのタイトルが継承されます。"
      ]
    },
    "event/addon/facility": {
      "facility_ids": [
        "イベントに関係する施設を設定します。"
      ]
    },
    "event/addon/ical_import": {
      "ical_basic_certs": [
        "iCal配信URLにベーシック認証が掛かっている場合、ユーザーとパスワードを設定します。"
      ],
      "ical_category_ids": [
        "iCal を取り込んだ際の記事のカテゴリーを設定します。"
      ],
      "ical_import_date_after": [
        "取り込む未来のイベントの日時を日単位で制限します。",
        "省略した場合、1 年以上先のイベントは取り込みません。"
      ],
      "ical_import_date_ago": [
        "取り込む過去のイベントの日時を日単位で制限します。",
        "省略した場合、前月分より過去のイベントは取り込みません。"
      ],
      "ical_import_url": [
        "iCal配信URLを設定します。"
      ],
      "ical_max_docs": [
        "最大保存件数を設定します。",
        null,
        "iCal を取り込んだ際に記事数が「最大保存件数」を超えた場合、イベント開始日の古い順に記事を削除し、記事数が「最大保存件数」以下になるように調整します。",
        null,
        "「最大保存件数」に 0 を指定すると、無制限に記事を保存します。"
      ],
      "ical_page_state": [
        "iCal を取り込んだ際の記事のステータスを設定します。",
        "設定しない場合、記事は公開保存されます。"
      ],
      "ical_refresh_method": [
        "iCal取り込みの更新方法を指定します。",
        "手動の場合は、管理画面上でインポートを行うことで取り込みを行います。",
        "自動の場合は、インストール時に設定した周期で自動で取り込みを行います。"
      ],
      "ical_sync_method": [
        "取り込んだイベント情報の同期方法を指定します。",
        "「完全」を指定した場合、iCal配信URLの情報と完全に同期します。iCal配信URLに存在するイベント情報は追加または更新され、iCal配信URLに存在しないイベント情報は削除されます。",
        "「追加」を指定した場合、iCal配信URLに存在するイベント情報は追加または更新されます。イベント情報を削除することはありません。"
      ]
    },
    "event/addon/ical_link": {
      "ical_link": [
        "ソースURLを設定します。"
      ],
      "ical_uid": [
        "ソースIDを設定します。"
      ]
    },
    "event/addon/page_list": {
      "loop_html": [
        "自動生成されたリスト表示部分のHTMLを指定することが可能です。",
        "下記のように記述します。\n#{class}　リンク先のファイル名が表示されます。ファイル名に拡張子がある場合、拡張子を除いた部分が表示されます。\n#{class_categories} リンク先ページ内がカテゴリに関連付けられている場合、全てのカテゴリのフォルダ名が表示されます。\n#{date}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.default}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.iso}　リンク先のページの公開日時が「2015-04-01」の形式で表示されます。\n#{date.long}　リンク先のページの公開日時が「2015年4月1日」の形式で表示されます。\n#{date.short}　リンク先のページの公開日時が「4/1」の形式で表示されます。\n#{time}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.default}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.iso}　リンク先のページの公開日時が「2015-4-1 12:34」の形式で表示されます。\n#{time.long}　リンク先のページの公開日時が「2015年4月1日 12時34分」の形式で表示されます。\n#{time.short}　リンク先のページの公開日時が「15/04/01 12:34」の形式で表示されます。\n#{url}　リンク先ページのURLが表示されます。\n#{name}　リンク先ページのタイトルが表示されます。\n#{index_name}　リンク先ページの一覧用タイトルが表示されます。未設定の場合はタイトルが表示されます。\n#{summary}　リンク先ページのSummaryが表示されます。\n#{html}　リンク先ページの本文が表示されます。\n#{current}　現在訪問しているページとURLが同一の場合、classにcurrentが付与されます。\n#{new}　リンク先のページ公開日時がNEWマーク期間の範囲内の場合、classにnewが付与されます。\n#{id}　リンク先のファイルIDが表示されます。\n#{group}　リンク先ページの所有グループが表示されます。\n#{groups}　リンク先ページの全ての所有グループが表示されます。\n#{img.src}　リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。\n#{thumb.src}　リンク先ページ内のサムネイル画像が表示されます。サムネイル画像が指定されていない場合は、#{img.src}に準じます。\n#{categories}　リンク先ページ内がカテゴリに関連付けられている場合、リンク先ページのカテゴリリストが表示されます。\n#{pages.count}　リンク先ページ内にページが存在する場合、リンク先ページ内のページ数が表示されます。\n#{event_dates} イベント日が「2015/4/1」の形式で表示されます。\n#{event_dates.default} イベント日が「2015/4/1」の形式で表示されます。\n#{event_dates.default_full} イベント日が「2015/4/1 (水)」の形式で表示されます。\n#{event_dates.iso} イベント日が「2015-4-1」の形式で表示されます。\n#{event_dates.iso_full} イベント日が「2015-4-1 (水)」の形式で表示されます。\n#{event_dates.long} イベント日が「2015年4月1日」の形式で表示されます。\n#{event_dates.full} イベント日が「2015年4月1日 (水)」の形式で表示されます。\n#{event_deadline} イベントの締切日が「2015/4/1 12:34」の形式で表示されます。\n#{event_deadline.default} イベントの締切日が「2015/4/1 12:34」の形式で表示されます。\n#{event_deadline.iso} イベントの締切日が「2015-4-1 12:34」の形式で表示されます。\n#{event_deadline.long} イベントの締切日が「2015年4月1日 12時34分」の形式で表示されます。\n#{event_deadline.short} イベントの締切日が「15/04/01 12:34」の形式で表示されます。\n#{tags} リンク先ページのタグが表示されます。\n\n使用例：\n&lt;article class=\"#{class}\">\n  &lt;header>\n    &lt;h2>&lt;a href=\"#{url}\">#{name}&lt;/a>&lt;/h2>\n  &lt;/header>\n  &lt;p>#{summary}&lt;/p>\n&lt;/article>"
      ],
      "sort": [
        "どういった順でリストの並べるかを指定します。",
        "タイトル、ファイル名、作成日時、更新日時、公開日時での並び順は昇順です。",
        "指定順での並び順は降順です",
        "イベント日はイベント日が設定されている項目を古い順に表示します。",
        "イベント日(未終了)は本日以降のイベントが古い順に表示されます。",
        "イベント日(今日)は本日のイベントが古い順に表示されます。",
        "イベント日(明日)は明日のイベントが古い順に表示されます。",
        "イベント日(一週間以内)は一週間以内のイベントが古い順に表示されます。",
        "イベント日(申込締切間近)は申込み締め切り日が近い順に表示されます。"
      ]
    },
    "event/page": {
      "file_import": [
        "CSV形式またはiCal形式のファイルをインポートすることができます。"
      ]
    },
    "ezine/addon/deliver_plan": {
      "deliver_date": [
        "配信予約日時を設定します。",
        "指定した日時が来ると配信を行います。"
      ]
    },
    "ezine/addon/reply": {
      "reply_lower_text": [
        "登録確認の自動返信メールの下部に記載するテキストを入力します。"
      ],
      "reply_signature": [
        "登録確認の自動返信メールに記載する署名を入力します。"
      ],
      "reply_upper_text": [
        "登録確認の自動返信メールの上部に記載するテキストを入力します。"
      ]
    },
    "ezine/addon/sender_address": {
      "sender_email": [
        "メールマガジンの送信者名に利用するメールアドレスを記載します。"
      ],
      "sender_name": [
        "メールマガジンの送信者名を記載します。"
      ]
    },
    "ezine/addon/signature": {
      "signature_html": [
        "HTML版メールマガジンに記載する署名を入力します。"
      ],
      "signature_text": [
        "テキスト版メールマガジンに記載する署名を入力します。"
      ]
    },
    "facility/addon/additional_info": {
      "field": [
        "追加情報の項目名を設定します。"
      ],
      "value": [
        "左欄項目の内容を設定します。"
      ]
    },
    "facility/addon/body": {
      "address": [
        "施設の住所を入力します。"
      ],
      "fax": [
        "施設のファクシミリ番号を入力します。"
      ],
      "kana": [
        "施設名（ページタイトル）のふりがなを入力します。"
      ],
      "postcode": [
        "施設の郵便番号を入力します。"
      ],
      "related_url": [
        "施設のウェブサイトアドレスを入力します。"
      ],
      "tel": [
        "施設の電話番号を入力します。"
      ]
    },
    "facility/addon/category": {
      "categories": [
        "施設の種類を設定します。"
      ]
    },
    "facility/addon/category_setting": {
      "st_categories": [
        "検索または施設作成時に使用する施設種類を設定します。"
      ]
    },
    "facility/addon/focus_setting": {
      "center_point": [
        "地域の中心座標を設定することで地図検索時にフォーカスすることができます。"
      ],
      "zoom_level": [
        "フォーカス時のズームレベル（１～１９）を設定します。",
        "数値が大きいほど近くにフォーカスされます。",
        "未設定時はフォーカスしても縮尺が変わりません。"
      ]
    },
    "facility/addon/image_info": {
      "image_alt": [
        "画像のALT属性（代替え文）を記入します。"
      ],
      "image_comment": [
        "画像の説明文を記入します。"
      ],
      "image_thumb_size": [
        "サムネイルのサイズを指定します。"
      ]
    },
    "facility/addon/location": {
      "locations": [
        "施設の地域を設定します。"
      ]
    },
    "facility/addon/location_setting": {
      "st_locations": [
        "検索または施設作成時に使用する施設地域を設定します。"
      ]
    },
    "facility/addon/pointer_image": {
      "image": [
        "施設検索結果の地図表示時に表示するポインタ画像を設定します。",
        "このカテゴリが設定された施設のポインタ画像が変更されます。"
      ]
    },
    "facility/addon/search_result": {
      "map_html": [
        "検索結果の地図部分のHTMLを記述することが可能です。以下のテンプレートが使用できます。",
        "#{canvas} 地図を表示します。",
        "#{sidebar} 地図と連動するサイドバーを表示します。",
        "#{filters} 種類の絞り込み、地域フォーカスを表示します。"
      ],
      "upper_html": [
        "検索結果上部のHTMLを記入することが可能です。以下のテンプレートが使用できます。",
        "#{tabs} 地図、一覧表示の切り替えタブを表示します。",
        "#{settings} 検索条件を変更するモーダルウインドウのリンクを表示します。",
        "#{keyword} キーワードの検索条件を表示します。",
        "#{category} 施設の種類の検索条件を表示します。",
        "#{service} 施設の用途の検索条件を表示します。",
        "#{location} 施設の地域の検索条件を表示します。",
        "#{number} 検索結果件数を表示します。"
      ]
    },
    "facility/addon/search_setting": {
      "conditions": [
        "自フォルダーの配下以外で検索対象に含める施設リストフォルダー名を記入します。",
        "改行することで複数のファルダー指定することが可能です。\n例：\ninstitution/list\nshelter/list"
      ],
      "search_html": [
        "検索部分のHTMLを記入することが可能です。以下のテンプレートが使用できます。",
        "#{keyword} キーワード検索フォームを表示します。",
        "#{category} 施設の種類検索フォームを表示します。",
        "#{service} 施設の用途検索フォームを表示します。",
        "#{location} 施設の地域検索フォームを表示します。"
      ]
    },
    "facility/addon/service": {
      "services": [
        "施設の用途を設定します。"
      ]
    },
    "facility/addon/service_setting": {
      "st_services": [
        "検索または施設作成時に使用する施設用途を設定します。"
      ]
    },
    "facility/addon/table": {
      "facility_caption": [
        "表のキャプションを設定します。",
        "未設定時はタイトルを使用します。"
      ]
    },
    "faq/addon/search": {
      "search_node_id": [
        "検索先のフォルダーを設定します。",
        "未入力の場合は自フォルダーを対象にします。"
      ]
    },
    "gws/addon/board/group_setting": {
      "board_browsed_delay": [
        "掲示板を既読にするまでの秒数を入力します。"
      ],
      "board_file_size_per_post": [
        "投稿単位での添付最大サイズを入力します。"
      ],
      "board_file_size_per_topic": [
        "トピック単位での添付最大サイズを入力します。"
      ],
      "board_files_break": [
        "添付ファイルの表示の並びを選択します。"
      ],
      "board_links_break": [
        "投稿のリンク表示の並びを選択します。"
      ],
      "board_new_days": [
        "新着表示期間を入力します。"
      ]
    },
    "gws/addon/circular/group_setting": {
      "circular_default_due_date": [
        "回覧期限日時の初期値を、今日から数えて何日後かで入力します。",
        "初期値は 7 日後です。"
      ],
      "circular_delete_threshold": [
        "回覧を保持する期間を入力します。",
        "作成日からこの期間が経過すると自動で完全に削除されます。",
        "初期値は 2年 です。"
      ],
      "circular_files_break": [
        "添付ファイルの表示の並びを選択します。"
      ],
      "circular_filesize_limit": [
        "回覧に添付されるファイルの合計容量の上限を入力します。",
        "未指定である場合、制限されません。",
        "初期値は 未指定 です。"
      ],
      "circular_max_member": [
        "参加者の人数の上限を入力します。",
        "未指定である場合、制限されません。",
        "初期値は 未指定 です。"
      ]
    },
    "gws/addon/column/select_like": {
      "select_options": [
        "回答の選択肢を入力します。",
        "テキストを改行で区切ることで複数の選択肢を入力することができます。"
      ]
    },
    "gws/addon/column/text_like": {
      "additional_attr": [
        "出力される入力形式のHTMLに属性を追加することが可能です。"
      ],
      "max_length": [
        "入力文字数の最大長を入力します。"
      ]
    },
    "gws/addon/contributor": {
      "contributor_name": [
        "投稿者名を選択します。"
      ]
    },
    "gws/addon/discussion/group_setting": {
      "discussion_comment_limit": [
        "１スレッドに対するコメントの上限を設定します。"
      ],
      "discussion_filesize_limit": [
        "スレッドまたは投稿に添付されるファイルの合計容量の上限を入力します。",
        "未設定である場合、制限されません。",
        "初期値は 未設定 です。"
      ],
      "discussion_new_days": [
        "新着表示期間を設定します。"
      ],
      "discussion_quota": [
        "電子会議室の合計容量の上限を入力します。",
        "合計容量が超えた場合、投稿ができません。",
        "未設定である場合、制限されません。",
        "初期値は 未設定 です。"
      ],
      "discussion_recent_limit": [
        "新着一覧の表示件数を設定します。"
      ],
      "discussion_todo_limit": [
        "ToDoの表示件数を設定します。"
      ],
      "discussion_unseen_interval": [
        "新着確認の間隔を設定します。"
      ]
    },
    "gws/addon/discussion/release": {
      "state": [
        "公開画面への公開、非公開を選択します。"
      ]
    },
    "gws/addon/elasticsearch/group_setting": {
      "elasticsearch_hosts": [
        "全文検索サーバーを入力します。"
      ],
      "elasticsearch_state": [
        "全文検索を有効にするか無効にするかを選択します。"
      ]
    },
    "gws/addon/faq/group_setting": {
      "faq_browsed_delay": [
        "よくある質問を既読にするまでの秒数を入力します。"
      ],
      "faq_file_size_per_post": [
        "投稿単位での添付最大サイズを入力します。"
      ],
      "faq_file_size_per_topic": [
        "トピック単位での添付最大サイズを入力します。"
      ],
      "faq_files_break": [
        "添付ファイルの表示の並びを選択します。"
      ],
      "faq_new_days": [
        "新着表示期間を入力します。"
      ]
    },
    "gws/addon/group_permission": {
      "custom_group_ids": [
        "編集を許可するカスタムグループを選択します。"
      ]
    },
    "gws/addon/import/user": {
      "in_file": [
        "CSVファイルを指定しユーザーのインポートを行います。",
        "idが記述されていない行は新規作成になります。"
      ]
    },
    "gws/addon/memo/group_setting": {
      "memo_filesize_limit": [
        "メッセージに添付されるファイルの合計容量の上限を入力します。",
        "未設定である場合、制限されません。",
        "初期値は 未設定 です。"
      ],
      "memo_quota": [
        "メッセージの合計容量の上限を入力します。",
        "合計容量が超えたユーザーはメッセージの送受信ができません。",
        "各受信フォルダー、送信済みフォルダー、下書きフォルダー内のメッセージが対象となります。",
        "未設定である場合、制限されません。",
        "初期値は 未設定 です。"
      ],
      "memo_reminder": [
        "メッセージを送信したあと各受信者のリマインダーに表示する日数を選択します。",
        "メッセージが下書きの時はリマインダーはまだ登録されません。",
        "メッセージが送信された時にリマインダーが登録されます。"
      ]
    },
    "gws/addon/memo/notify_setting": {
      "notify_state": [
        "参加者への通知の有無を設定します。"
      ]
    },
    "gws/addon/memo/priority": {
      "priority": [
        "メッセージの重要度を選択します。"
      ]
    },
    "gws/addon/monitor/contributor": {
      "contributor_name": [
        "投稿者名を選択します。"
      ]
    },
    "gws/addon/monitor/group": {
      "group_name": [
        "参加するグループを選択します。",
        "「公開設定」でステータスを下書きにすることで編集可能となります。"
      ]
    },
    "gws/addon/monitor/group_setting": {
      "default_notice_state": [
        "お知らせ表示条件の既定値を選択します。"
      ],
      "monitor_delete_threshold": [
        "照会・回答を完全に削除するまでの期限を入力します。基準は「ゴミ箱」に移動した日です。"
      ],
      "monitor_file_size_per_post": [
        "投稿単位での添付最大サイズを入力します。"
      ],
      "monitor_file_size_per_topic": [
        "トピック単位での添付最大サイズを入力します。"
      ],
      "monitor_files_break": [
        "添付ファイルの表示の並びを選択します。"
      ],
      "monitor_new_days": [
        "新着表示期間を入力します。"
      ]
    },
    "gws/addon/notice/comment_setting": {
      "comment_state": [
        "コメント投稿を有効にするかどうかを選択します。"
      ]
    },
    "gws/addon/notice/resource_limitation": {
      "notice_individual_file_size_limit": [
        "最大ファイルサイズを入力します。"
      ],
      "notice_total_body_size_limit": [
        "フォルダーの総本文制限を入力します。"
      ],
      "notice_total_file_size_limit": [
        "フォルダーの総容量制限を入力します。"
      ]
    },
    "gws/addon/presence/delegator_setting": {
      "presence_editable_title_ids": [
        "別の役職を設定することで、その役職に該当するユーザーの在席状況を更新できます。"
      ]
    },
    "gws/addon/presence/group_setting": {
      "presence_notification_state": [
        "在席状況の確認通知を設定します。"
      ]
    },
    "gws/addon/qna/group_setting": {
      "qna_browsed_delay": [
        "Ｑ＆Ａを既読にするまでの秒数を入力します。"
      ],
      "qna_file_size_per_post": [
        "投稿単位での添付最大サイズを入力します。"
      ],
      "qna_file_size_per_topic": [
        "トピック単位での添付最大サイズを入力します。"
      ],
      "qna_files_break": [
        "添付ファイルの表示の並びを選択します。"
      ],
      "qna_new_days": [
        "新着表示期間を入力します。"
      ]
    },
    "gws/addon/readable_setting": {
      "readable_custom_group_ids": [
        "閲覧を許可するカスタムグループを選択します。"
      ],
      "readable_group_ids": [
        "閲覧を許可するグループを選択します。"
      ],
      "readable_member_ids": [
        "閲覧を許可するユーザーを選択します。"
      ],
      "readable_setting_range": [
        "<b>全公開</b> - 誰でも閲覧できます。",
        "<b>選択範囲</b> - 選択した対象のみ閲覧できます。",
        "<b>非公開</b> - 作成者のみ閲覧できます。"
      ]
    },
    "gws/addon/reminder": {
      "reminder_date": [
        "リマインダー日時を登録または解除することができます。",
        null,
        "リマインダー日時を登録する場合、日時を入力後「通知する」を設定し、登録ボタンをクリックします。",
        null,
        "リマインダー日時を解除する場合、「通知しない」を設定し、登録ボタンをクリックします。"
      ]
    },
    "gws/addon/role": {
      "gws_role_ids": [
        "ロールを選択します。"
      ]
    },
    "gws/addon/schedule/attendance": {
      "attendance_check_state": [
        "出欠確認を有効にするかしないかを選択してください。"
      ]
    },
    "gws/addon/schedule/facility": {
      "facility_ids": [
        "使用する設備を選択します。"
      ]
    },
    "gws/addon/schedule/group_setting": {
      "schedule_attachment_state": [
        "ファイル添付を許可するかどうかを選択します。"
      ],
      "schedule_drag_drop_state": [
        "ドラッグ＆ドロップを許可するかどうかを選択します。"
      ],
      "schedule_max_file_size": [
        "添付ファイルの最大サイズを入力します。",
        "0 は無制限を意味します。"
      ],
      "schedule_max_month": [
        "期末月を入力します。"
      ],
      "schedule_max_years": [
        "年数を入力します。"
      ],
      "schedule_menu_label": [
        "メニュー名称を入力します。",
        "既定値は「スケジュール」です。"
      ],
      "schedule_state": [
        "機能を利用するかしないかを選択します。"
      ],
      "todo_delete_threshold": [
        "ToDoを復旧することができる期間を入力します。"
      ]
    },
    "gws/addon/schedule/member": {
      "member_ids": [
        "スケジュールへの参加者を選択します。"
      ]
    },
    "gws/addon/schedule/repeat": {
      "interval": [
        "繰り返し間隔を選択します。"
      ],
      "repeat_base": [
        "繰り返しの基準を選択します。"
      ],
      "repeat_end": [
        "終了日を入力します。"
      ],
      "repeat_start": [
        "開始日を入力します。"
      ],
      "repeat_type": [
        "繰り返しを選択します。"
      ],
      "wdays": [
        "曜日を選択します。"
      ]
    },
    "gws/addon/schedules": {
      "schedule_ids": [
        "スケジュールを選択します。"
      ]
    },
    "gws/addon/share/group_setting": {
      "share_default_sort": [
        "ファイル一覧の並び順の規定値を選択します。"
      ],
      "share_files_capacity": [
        "総容量を入力します。"
      ],
      "share_max_file_size": [
        "最大ファイルサイズを入力します。"
      ]
    },
    "gws/addon/share/resource_limitation": {
      "share_max_file_size": [
        "最大ファイルサイズを入力します。",
        "最上位のフォルダーの設定が下位の全てのフォルダーに適用されます。"
      ],
      "share_max_folder_size": [
        "フォルダーの総容量制限を入力します。",
        "最上位のフォルダーの設定が下位の全てのフォルダーに適用されます。"
      ]
    },
    "gws/addon/staff_record/seating": {
      "in_file": [
        "CSVファイルを指定しインポートを行います。",
        "idが記述されていない行は新規作成になります。"
      ],
      "name": "タイトルを入力します。",
      "order": "並び順を入力します。",
      "remark": "備考を入力します。",
      "url": "座席表URLを入力します。"
    },
    "gws/addon/subscription_setting": {
      "subscribed_custom_group_ids": [
        "このページを購読するカスタムグループを選択します。"
      ],
      "subscribed_group_ids": [
        "このページを購読するグループを選択します。"
      ],
      "subscribed_member_ids": [
        "このページを購読するユーザーを選択します。"
      ]
    },
    "gws/addon/survey/group_setting": {
      "survey_default_due_date": [
        "回答期限日時の初期値を、今日から数えて何日後かで入力します。",
        "初期値は 7 日後です。"
      ]
    },
    "gws/addon/system/group_setting": {
      "canonical_domain": [
        "グループウェアドメインを入力します。",
        "システムからメールを送信する際、メールに記載される URL がここで設定したドメインになります。"
      ],
      "canonical_scheme": [
        "グループウェアスキームを選択します。",
        "システムからメールを送信する際、メールに記載される URL がここで設定したスキームになります。"
      ],
      "sender_user_id": [
        "差出ユーザーを選択します。",
        "掲示板の新着投稿通知などの差出人として使用されます。",
        "また、差出人ユーザーと差出人メールアドレスの両方が設定されている場合、差出人ユーザーの方が優先的に使用されます。"
      ],
      "sendmail_domains": [
        "メール送信許可ドメインを入力します。"
      ],
      "trash_threshold": [
        "ゴミ箱の保持期間を設定できます。"
      ]
    },
    "gws/addon/user/public_duty": {
      "charge_address": "担当住所・電話を入力します。",
      "charge_name": "担当を入力します。",
      "charge_tel": "担当電話を入力します。",
      "divide_duties": "事務分掌を入力します。"
    },
    "gws/attendance/download_param": {
      "encoding": [
        "文字コードを選択してください。",
        "難読人名に対して特殊な漢字を割り当てている場合は「UTF-8」を選択してください。",
        "通常の利用の場合ですと「シフトJIS」を選択して問題ありません。"
      ],
      "term": [
        "ダウンロード期間を設定してください。"
      ],
      "user_ids": [
        "ダウンロードするユーザーを選択してください。"
      ]
    },
    "gws/board/category": {
      "name": [
        "カテゴリー名を入力します。"
      ]
    },
    "gws/board/postable": {
      "mode": [
        "表示形式を選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "permit_comment": [
        "コメントを許可するかどうかを選択します。"
      ],
      "severity": [
        "重要度を選択します。"
      ]
    },
    "gws/bookmark": {
      "bookmark_model": [
        "リンク先の機能を選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "url": [
        "URLを入力します。"
      ]
    },
    "gws/chorg/run_params": {
      "reservation": [
        "実行する時間を予約できます。"
      ],
      "staff_record_code": [
        "作成する電子職員録の西暦を入力します。（例：2017）",
        "電子職員録を作成するを選択した場合、必須です。"
      ],
      "staff_record_name": [
        "作成する電子職員録の年度名を入力します。（例：平成00年度）",
        "電子職員録を作成するを選択した場合、必須です。"
      ],
      "staff_record_state": [
        "電子職員録を作成するかどうかを選択します。",
        "作成するを選択すると組織変更実行前に現況を元にした電子職員録が作成されます。"
      ]
    },
    "gws/circular/comment": {
      "name": "タイトルです",
      "text": "コメントです"
    },
    "gws/circular/post": {
      "due_date": [
        "回覧期限日時を選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "see_type": [
        "既読にする形式を選択します。",
        "通常回覧：ボタンを押下した時に既読にする",
        "簡易回覧：詳細を開いた時に自動的に既読にする"
      ]
    },
    "gws/column/base": {
      "name": [
        "入力項目名を入力します。"
      ],
      "order": [
        "表示順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "place_holder": [
        "プレースホルダーを入力します。"
      ],
      "postfix_label": [
        "入力項目の後に表示するラベルを入力します。"
      ],
      "prefix_label": [
        "入力項目の前に表示するラベルを入力します。"
      ],
      "required": [
        "項目の入力が必須か任意かを選択します。"
      ],
      "tooltips": [
        "項目のツールチップを入力します。"
      ]
    },
    "gws/column/date_field": {
      "input_type": [
        "種類を選択します。"
      ]
    },
    "gws/column/file_upload": {
      "upload_file_count": [
        "アップロードできるファイル数を選択します。"
      ]
    },
    "gws/column/number_field": {
      "initial_decimal": [
        "初期値を入力します。"
      ],
      "max_decimal": [
        "最大値を入力します。"
      ],
      "min_decimal": [
        "最小値を入力します。"
      ],
      "minus_type": [
        "負数の表示方法を選択します。"
      ],
      "scale": [
        "小数点以下の桁数を入力します。"
      ]
    },
    "gws/column/text_field": {
      "input_type": [
        "種類を選択します。",
        "一部の種類は、最近のブラウザでしかサポートされていません。"
      ]
    },
    "gws/contrast": {
      "color": [
        "背景色を選択します。"
      ],
      "name": [
        "名前を入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "state": [
        "公開、非公開を選択します。"
      ],
      "text_color": [
        "文字色を選択します。"
      ]
    },
    "gws/custom_group": {
      "member_ids": [
        "参加者を選択します。"
      ],
      "name": [
        "グループ名を入力します。"
      ],
      "order": [
        "表示順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ]
    },
    "gws/discussion/forum": {
      "forum_quota": [
        "電子会議室の使用容量の上限を入力します。",
        "使用容量が超えた場合、投稿ができません。",
        "未設定である場合、制限されません。",
        "初期値は 未設定 です。"
      ],
      "name": [
        "タイトルを入力します。"
      ]
    },
    "gws/discussion/topic": {
      "name": [
        "タイトルを入力します。"
      ],
      "order": [
        "並び順を設定します。数字が小さいほど先頭に表示されます。"
      ],
      "permanently": [
        "有効にするとコメントの投稿、編集、削除を行えなくなります。"
      ],
      "permit_comment": [
        "コメントを許可するかどうかを選択します。"
      ],
      "topic_quota": [
        "スレッドの使用容量の上限を入力します。",
        "使用容量が超えた場合、投稿ができません。",
        "未設定である場合、制限されません。",
        "初期値は 未設定 です。"
      ]
    },
    "gws/elasticsearch": {
      "tabs": {
        "all": [
          "検索キーワードを入力し、検索ボタンをクリックしてください。文書を検索することができます。",
          "検索キーワードは、半角スペースで区切ることで複数個入力することができます。",
          "　",
          "他の便利な使い方：",
          "OR 検索をするにはキーワードを OR で区切って入力します。必ず OR の前後に半角スペースを入力するようにしてください。",
          "　例: 議事録または報告書を含む文書を検索する",
          "　　議事録 OR 報告書",
          "　",
          "作成者で検索するには user_name: の後にスペースを空けずにユーザー名を入力します。",
          "　例: シラサギ太郎が作成した文書を検索する",
          "　　user_name:シラサギ太郎",
          "　",
          "作成日で検索するには created: の後にスペースを空けずに日付を入力します。",
          "　例: 2017年11月21日に作成した文書を検索する",
          "　　created:2017-11-20",
          "　",
          "作成日の範囲検索を実行するには、次の例を参考に入力します。",
          "　例: 2017年10月1日から2017年10月31日に作成した文書を検索する",
          "　　created:[2017-10-01 TO 2017-10-31]",
          "　",
          "作成日ではなく更新日で検索するには created を updated に変更します。",
          "　",
          "全文書を検索するには *:* を入力します。",
          "　",
          "「すべて」では公開されている文書を検索することができます。非公開の文書を検索するには、個別のタブを開き、検索してください。"
        ]
      }
    },
    "gws/facility/category": {
      "name": [
        "カテゴリー名を入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ]
    },
    "gws/facility/custom_field": {
      "name": [
        "項目の名称を入力します。"
      ],
      "order": [
        "質問項目の並び順を指定します。",
        "数字が小さいほど上位に表示されます。"
      ]
    },
    "gws/facility/item": {
      "activation_date": [
        "有効期間（開始）を入力します。",
        "有効期間がない場合は空にしておきます。"
      ],
      "approval_check_state": [
        "予約に管理ユーザーの承認を必要とします。"
      ],
      "category_id": [
        "カテゴリーを選択します。"
      ],
      "expiration_date": [
        "有効期間（終了）を入力します。",
        "有効期間がない場合は空にしておきます。"
      ],
      "max_days_limit": [
        "何日先まで予約可能かを入力します。"
      ],
      "minutes_limit": [
        "連続して利用することが可能な最大の時間を入力します。"
      ],
      "name": [
        "設備名を入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "reservation_end_date": [
        "予約可能期間（終了）を入力します。",
        "予約可能期間の指定がない場合は空にしておきます。"
      ],
      "reservation_start_date": [
        "予約可能期間（開始）を入力します。",
        "予約可能期間の指定がない場合は空にしておきます。"
      ]
    },
    "gws/faq/category": {
      "name": [
        "カテゴリー名を入力します。"
      ]
    },
    "gws/faq/postable": {
      "mode": [
        "表示形式を選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "permit_comment": [
        "コメントを許可するかどうかを選択します。"
      ],
      "severity": [
        "重要度を選択します。"
      ]
    },
    "gws/link": {
      "name": [
        "タイトルを入力します。"
      ]
    },
    "gws/memo/filter": {
      "action": [
        "条件に合致したメッセージに対して行う操作を選択します。",
        "移動する：指定したフォルダーにメッセージを移動します",
        "ゴミ箱に移す：ゴミ箱にメッセージを移動します"
      ],
      "body": [
        "フィルターの条件となる本文を入力します。",
        "件名は部分一致で評価されます。"
      ],
      "folder": [
        "移動するアクションで送り先となるフォルダーを指定します。"
      ],
      "from_member_ids": [
        "フィルターの条件となる差出人を選択します。"
      ],
      "name": [
        "フィルターの名前を入力します。",
        "作成したフィルターはメッセージの受信時に各条件が1度のみ評価されます。"
      ],
      "order": [
        "フィルターの評価順を数字で入力します。",
        "番号の小さい順でフィルターの評価が行われます。"
      ],
      "state": [
        "フィルターの状態を選択します。",
        "有効：このフィルターを有効化します",
        "無効：このフィルターを無効化します"
      ],
      "subject": [
        "フィルターの条件となる件名を入力します。",
        "件名は部分一致で評価されます。"
      ],
      "to_member_ids": [
        "フィルターの条件となる宛先（CC含む）を選択します。"
      ]
    },
    "gws/memo/folder": {
      "in_parent": [
        "親フォルダーを選択してください。"
      ],
      "name": "フォルダーの名称を入力します。",
      "order": [
        "フォルダーの並び順を数字で入力します。",
        "番号の小さい順にフォルダーが表示されます。"
      ]
    },
    "gws/memo/forward": {
      "default": [
        "メッセージ転送設定を行います。",
        "有効：メッセージを登録したメールアドレスに転送します",
        "無効：転送しません"
      ],
      "email": [
        "メッセージ転送先のメールアドレスを入力します。"
      ]
    },
    "gws/memo/list": {
      "category_ids": [
        "カテゴリーを選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "sender_name": [
        "送信者を入力します。省略した場合、送信者名としてタイトルが用いられます。"
      ],
      "signature": [
        "署名を入力します。"
      ]
    },
    "gws/memo/message": {
      "member_ids": [
        "メッセージの宛先を選択します。"
      ]
    },
    "gws/memo/signature": {
      "default": [
        "メッセージを新規作成した際に自動で入力される署名を選択します。",
        "有効：この署名を自動で入力します",
        "無効：この署名を自動で入力しません"
      ],
      "name": [
        "署名の一覧に表示される名称を入力します。"
      ],
      "text": [
        "署名の本文を入力します。"
      ]
    },
    "gws/memo/template": {
      "name": [
        "電話メモの一覧に表示される名称を入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "text": [
        "電話メモの本文を入力します。"
      ]
    },
    "gws/model/category": {
      "color": [
        "表示色を入力します。",
        null,
        "表示色は \"#RRGGBB\" 形式で入力します（RR, GG, BB はそれぞれ赤、緑、青の成分を16進数で入力）。"
      ],
      "name": [
        "種別名を入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ]
    },
    "gws/model/file": {
      "filename": [
        "ファイル名（英数）を入力します。"
      ],
      "geo_location": [
        "緯度・経度を10進で入力します。"
      ],
      "in_file": [
        "ファイルを選択します。"
      ],
      "memo": [
        "補足情報を入力します。"
      ],
      "name": [
        "ファイル名を入力します。"
      ]
    },
    "gws/model/folder": {
      "in_parent": [
        "親フォルダーを選択してください。"
      ],
      "name": [
        "フォルダー名を入力します。",
        "フォルダー名には次の文字は使えません: \\ / : * ? \" < > |"
      ],
      "order": [
        "並び順を入力します。"
      ]
    },
    "gws/monitor/category": {
      "name": [
        "カテゴリー名を入力します。"
      ]
    },
    "gws/monitor/postable": {
      "draft_alert": [
        "下書き状態です。",
        "内容を確認の上、配信してください。"
      ],
      "mode": [
        "表示形式を選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "permit_comment": [
        "コメントを許可するかどうかを選択します。"
      ],
      "severity": [
        "重要度を選択します。"
      ]
    },
    "gws/monitor/topic": {
      "admin_setting": [
        "記事管理者の範囲を選択します。"
      ],
      "due_date": [
        "回答期限を選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "notice_state": [
        "お知らせ表示条件を選択します。"
      ],
      "spec_config": [
        "回答の表示方法を選択します。"
      ],
      "state": [
        "ユーザーに公開する設定を選択します。",
        "<b>下書き</b> - 配信状態になります。",
        "<b>配信済み</b> - 回答可能かつ配信状態になります。",
        "<b>締め切り</b> - 設問を締め切り状態にします。"
      ]
    },
    "gws/notice/post": {
      "name": [
        "タイトルを入力します。"
      ],
      "severity": [
        "種別を選択します。",
        "「重要なお知らせ」の場合、チェックをつけます。",
        "「重要なお知らせ」にチェックをつけた場合、コンテンツ内の先頭に目立つ色で表示されます。"
      ]
    },
    "gws/personal_address/address": {
      "address_group_id": [
        "グループ名を入力します。"
      ]
    },
    "gws/personal_address/group": {
      "name": [
        "グループ名を入力します。"
      ],
      "order": [
        "並び順を入力します。"
      ]
    },
    "gws/portal/group_setting": null,
    "gws/portal/portlet_model": {
      "circular_article_state": [
        "<b>未読</b> - 未読のみをポータルに表示する。",
        "<b>全表示</b> - 既読・未読すべてをポータルに表示する。"
      ],
      "name": "ポートレット名を入力します。"
    },
    "gws/portal/user_setting": null,
    "gws/qna/category": {
      "name": [
        "カテゴリー名を入力します。"
      ]
    },
    "gws/qna/postable": {
      "mode": [
        "表示形式を選択します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "permit_comment": [
        "コメントを許可するかどうかを選択します。"
      ],
      "severity": [
        "重要度を選択します。"
      ]
    },
    "gws/report/category": {
      "name": [
        "カテゴリー名を入力します。"
      ]
    },
    "gws/report/file": {
      "name": [
        "タイトルを入力します。"
      ]
    },
    "gws/report/form": {
      "memo": [
        "備考を入力します。",
        "備考は他の場所に表示されませんので管理目的のメモなどを入力します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "state": [
        "申請フォームを公開するかどうかを選択します。"
      ]
    },
    "gws/role": {
      "permission_level": [
        "権限レベルを設定します。"
      ]
    },
    "gws/schedule/category": {
      "name": [
        "スケジュール種別を入力します。"
      ]
    },
    "gws/schedule/holiday": {
      "color": [
        "表示色を入力します。",
        null,
        "表示色は \"#RRGGBB\" 形式で入力します（RR, GG, BB はそれぞれ赤、緑、青の成分を16進数で入力）。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "term": [
        "休日の開始日と終了日を入力します。"
      ]
    },
    "gws/schedule/plan": {
      "category_id": [
        "スケジュール種別を選択します。"
      ],
      "color": [
        "表示色を入力します。",
        null,
        "表示色は \"#RRGGBB\" 形式で入力します（RR, GG, BB はそれぞれ赤、緑、青の成分を16進数で入力）。"
      ]
    },
    "gws/schedule/planable": {
      "name": [
        "スケジュールのタイトルを入力します。"
      ],
      "term": [
        "スケジュールの日時か日を入力します。",
        null,
        "「終日」をチェックすると、終日にわたって実施するスケジュールを入力することができ、「終日」にチェックが入っている場合、スケジュールの日を入力します。"
      ]
    },
    "gws/schedule/priority": {
      "priority": "重要度を選択します。"
    },
    "gws/schedule/repeat_plan": {
      "interval": [
        "繰り返し間隔を選択します。"
      ],
      "repeat_base": [
        "繰り返しの基準を選択します。"
      ],
      "repeat_end": [
        "終了日を入力します。"
      ],
      "repeat_start": [
        "開始日を入力します。"
      ],
      "repeat_type": [
        "繰り返しを選択します。"
      ],
      "wdays": [
        "曜日を選択します。"
      ]
    },
    "gws/schedule/todo": {
      "category_id": [
        "スケジュール種別を選択します。"
      ],
      "color": [
        "表示色を入力します。",
        null,
        "表示色は \"#RRGGBB\" 形式で入力します（RR, GG, BB はそれぞれ赤、緑、青の成分を16進数で入力）。"
      ],
      "name": [
        "タスク名を入力します。"
      ],
      "term": [
        "タスクの期限日を入力します。"
      ]
    },
    "gws/share/category": {
      "name": [
        "カテゴリー名を入力します。"
      ]
    },
    "gws/share/file": {
      "folder": "フォルダー名を選択します。",
      "url_copy": "クリップボードにファイルのURLをコピーします。"
    },
    "gws/shared_address/group": {
      "name": [
        "グループ名を入力します。"
      ],
      "order": [
        "並び順を入力します。"
      ]
    },
    "gws/staff_record/group": {
      "code": "所属コードを入力します。",
      "in_file": [
        "CSVファイルを指定しインポートを行います。",
        "idが記述されていない行は新規作成になります。"
      ],
      "name": "所属名を入力します。",
      "order": "並び順を入力します。",
      "seating_chart_url": "座席表URLを入力します。"
    },
    "gws/staff_record/user": {
      "charge_address": "担当住所・電話を入力します。",
      "charge_name": "担当を入力します。",
      "charge_tel": "担当電話を入力します。",
      "code": "職員番号を入力します。",
      "divide_duties": "事務分掌を入力します。",
      "divide_duties_view": "事務分掌表へ表示するかしないかを選択します。",
      "in_file": [
        "CSVファイルを指定しインポートを行います。",
        "idが記述されていない行は新規作成になります。"
      ],
      "kana": "職員氏名（カナ）を入力します。",
      "multi_section": "本務・兼務を選択します。",
      "name": "職員氏名を入力します。",
      "order": "並び順を入力します。",
      "remark": "備考を入力します。",
      "section_name": "所属を選択します。",
      "staff_records_view": "電子職員録へ表示するかしないかを選択します。",
      "tel_ext": "個人内線を入力します。",
      "title_name": "役職を入力します。"
    },
    "gws/staff_record/year": {
      "close_date": "年度の終了日を入力します。（例：2018/03/31）",
      "code": "西暦を入力します。（例：2017）",
      "name": "年度名を入力します。（例：平成00年度）",
      "start_date": "年度の開始日を入力します。（例：2017/04/01）"
    },
    "gws/staff_record/yearly": {
      "year_id": "年度を選択します。"
    },
    "gws/survey/form": {
      "anonymous_state": [
        "匿名回答を有効にすると、回答者に関する情報が記録されません。",
        "既定では無効で、誰が回答したかを記録します。"
      ],
      "close_date": [
        "公開を終了する日付を指定します。",
        "指定した日付がくると非公開になります。",
        "省略した場合、無期限に公開します。"
      ],
      "description": [
        "説明を入力します。"
      ],
      "due_date": [
        "回答期限を指定します。"
      ],
      "file_edit_state": [
        "回答の編集を有効にするか無効にするか選択します。",
        "「無効」を選択すると、回答を編集することができなくなります。",
        "「有効」を選択すると、いつでも回答を編集することができます。",
        "「締切まで有効」を選択すると、締切までの間、回答を編集することができます。"
      ],
      "file_state": [
        "回答結果を公開するかどうかを選択します。",
        "「公開」を選択すると、フォームの閲覧者に設定されていれば、誰の回答でも閲覧することができます。",
        "「非公開」を選択すると、自分の回答のみを閲覧できます。"
      ],
      "memo": [
        "備考を入力します。",
        "備考は他の場所に表示されませんので管理目的のメモなどを入力します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "release_date": [
        "公開を開始する日付を指定します。",
        "指定した日付がくると公開になります。",
        "省略した場合、公開操作実行後に即座に公開されます。"
      ],
      "state": [
        "フォームを公開するかどうかを選択します。"
      ]
    },
    "gws/user": {
      "gws_main_group_ids": [
        "ユーザーの所属する主なグループを選択します。"
      ]
    },
    "gws/user_form": {
      "memo": [
        "備考を入力します。",
        "備考は他の場所に表示されませんので管理目的のメモなどを入力します。"
      ],
      "state": [
        "ユーザー拡張情報を使用するかしないかを選択します。"
      ]
    },
    "gws/user_presence": {
      "memo": [
        "備考を入力します。"
      ],
      "plan": [
        "状況を入力します。"
      ],
      "state": [
        "ステータスを入力します。"
      ],
      "sync_available_state": [
        "設定を有効にすることで、ログイン時にステータスが離席の場合、在席に更新します。"
      ],
      "sync_unavailable_state": [
        "設定を有効にすることで、ログアウト時にステータスが在席の場合、離席に更新します。"
      ]
    },
    "gws/workflow/column": {
      "name": [
        "項目を入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ]
    },
    "gws/workflow/file": {
      "name": [
        "タイトルを入力します。"
      ]
    },
    "gws/workflow/form": {
      "agent_state": [
        "代理申請を許可するかどうかを選択します。"
      ],
      "memo": [
        "備考を入力します。",
        "備考は他の場所に表示されませんので管理目的のメモなどを入力します。"
      ],
      "name": [
        "タイトルを入力します。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "state": [
        "申請フォームを公開するかどうかを選択します。"
      ]
    },
    "inquiry/addon/aggregation": {
      "aggregation_state": [
        "公開側で集計機能を使用するかを選択します。"
      ]
    },
    "inquiry/addon/captcha": {
      "inquiry_captcha": [
        "フォームに画像認証を利用する場合は「使用する」を選択してください。"
      ]
    },
    "inquiry/addon/faq": {
      "faq_id": [
        "FAQのフォルダーを選択します。",
        "回答データからFAQのページを作成できます。"
      ]
    },
    "inquiry/addon/feedback_setting": {
      "feedback_confirmation": [
        "確認画面を利用する場合は「使用する」を選択してください。"
      ],
      "lower_html": [
        "下部に任意の内容をHTMLで記述することが可能です。"
      ],
      "upper_html": [
        "上部に任意の内容をHTMLで記述することが可能です。"
      ]
    },
    "inquiry/addon/input_setting": {
      "additional_attr": [
        "出力される入力形式のHTMLに属性を追加することが可能です。"
      ],
      "input_confirm": [
        "入力項目を二重に入力させ、入力内容を確認するかどうかを選択します。"
      ],
      "input_type": [
        "回答欄の入力形式を選択します。"
      ],
      "max_upload_file_size": [
        "アップロード出来るファイルサイズを指定します。ファイルサイズをMB(メガバイト)単位で指定します。"
      ],
      "question": [
        "FAQの新規作成時に回答データを引用するかどうかを選択します。"
      ],
      "required": [
        "項目の入力が必須か任意かを選択します。"
      ],
      "required_in_select_form": [
        "フォーム別の項目の入力が必須か任意かを選択します。",
        "チェックしたフォームの場合必須入力、チェックしないフォームの場合任意入力になります。",
        "「フォーム別必須入力」を設定する場合「必須入力」は「任意」にしておく必要があります。"
      ],
      "select_options": [
        "入力形式で「ラジオボタン選択」「プルダウン選択」「チェックボックス選択」「フォーム選択」を選択した場合の回答の選択肢を入力します。",
        "改行で複数の選択肢を入力します。"
      ],
      "transfers": [
        "入力形式で「テキストボックス」「テキストエリア」を選択した場合の回答に特定キーワードが含まれた場合、転送するアドレスを入力します。"
      ]
    },
    "inquiry/addon/message": {
      "inquiry_html": [
        "フォーム画面の上部に表示する説明テキストを入力します。"
      ],
      "inquiry_results_html": [
        "集計結果画面の上部に表示される内容を入力します。"
      ],
      "inquiry_sent_html": [
        "送信完了画面に表示される画面の内容を入力します。"
      ]
    },
    "inquiry/addon/notice": {
      "from_email": [
        "通知メールの差出人メールアドレスを入力します。"
      ],
      "from_name": [
        "通知メールに記載される差出人名を入力します。"
      ],
      "notice_content": [
        "通知メールの内容を設定します。",
        "「通知のみ」 回答へのリンクが記載されます。",
        "「投稿内容含む」回答へのリンクと回答内容すべてが記載されます。"
      ],
      "notice_email": [
        "フォームへの投稿があったことを通知する先のメールアドレスを入力します。"
      ],
      "notice_state": [
        "フォームへの投稿があったことを通知することが可能です。"
      ]
    },
    "inquiry/addon/release_plan": {
      "reception_close_date": [
        "回答受付終了日時を指定します。",
        "指定した日時が来ると回答入力フォームが非公開になります。"
      ],
      "reception_start_date": [
        "回答受付開始日時を指定します。",
        "指定した日時が来ると回答入力フォームが公開されます。"
      ]
    },
    "inquiry/addon/reply": {
      "reply_lower_text": [
        "自動返信メールの本文下部のテキストを設定します。",
        "署名等の記載に利用します。"
      ],
      "reply_state": [
        "フォームへ投稿した利用者に自動返信メールを送ることが可能です。",
        "本文にはフォームに入力された内容が記載されます。"
      ],
      "reply_subject": [
        "自動返信メールの件名を設定します。"
      ],
      "reply_upper_text": [
        "自動返信メールの本文上部のテキストを設定します。",
        "挨拶文等の記載に利用します。"
      ]
    },
    "inquiry/answer": {
      "comment": [
        "コメントを入力します。"
      ],
      "state": [
        "状態を選択します。"
      ]
    },
    "inquiry/column": {
      "html": [
        "項目の説明テキストを入力します。"
      ],
      "name": [
        "質問項目の名称を入力します。"
      ],
      "order": [
        "質問項目の並び順を指定します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "state": [
        "公開画面への公開、非公開を選択します。",
        "非公開を選択することで公開画面から取り下げることが可能です。"
      ]
    },
    "jmaxml/action/base": {
      "in_type": [
        "受信時の動作の種別を選択します。"
      ],
      "name": [
        "名前を指定します。"
      ]
    },
    "jmaxml/addon/action/publish_page": {
      "category_ids": [
        "作成した記事ページに設定するカテゴリーを選択します。"
      ],
      "publish_state": [
        "作成した記事ページの公開状態を選択します。"
      ],
      "publish_to_id": [
        "記事ページを作成するフォルダーを選択します。"
      ]
    },
    "jmaxml/addon/action/publishing_office": {
      "publishing_office_state": [
        "気象台発表を表示するかどうかを選択します。"
      ]
    },
    "jmaxml/addon/action/recipient": {
      "recipient_group_ids": [
        "メールを受信するグループを選択します。"
      ],
      "recipient_user_ids": [
        "メールを受信するユーザーを選択します。"
      ]
    },
    "jmaxml/addon/action/sender": {
      "sender_email": [
        "メールの送信者名に利用するメールアドレスを記載します。"
      ],
      "sender_name": [
        "メールの送信者名を記載します。"
      ],
      "signature_text": [
        "メールに記載する署名を入力します。"
      ]
    },
    "jmaxml/addon/action/switch_urgency": {
      "urgency_layout_id": [
        "緊急災害レイアウトを選択します。"
      ]
    },
    "jmaxml/addon/filter": {
      "execute_filters_job_state": [
        "フィルター処理を別のジョブとして実行する場合、有効にします。"
      ]
    },
    "jmaxml/addon/trigger/ash_fall_forecast": {
      "sub_types": [
        "種類を選択します。"
      ],
      "target_region_ids": [
        "対象区域を選択します。"
      ]
    },
    "jmaxml/addon/trigger/flood_forecast": {
      "target_region_ids": [
        "水位観測所を選択します。"
      ]
    },
    "jmaxml/addon/trigger/landslide_info": {
      "target_region_ids": [
        "対象区域を選択します。"
      ]
    },
    "jmaxml/addon/trigger/quake": {
      "earthquake_intensity": [
        "震度を選択します。"
      ],
      "target_region_ids": [
        "対象区域を選択します。"
      ]
    },
    "jmaxml/addon/trigger/tornado_alert": {
      "target_region_ids": [
        "対象区域を選択します。"
      ]
    },
    "jmaxml/addon/trigger/tsunami": {
      "sub_types": [
        "種類を選択します。"
      ],
      "target_region_ids": [
        "対象区域を選択します。"
      ]
    },
    "jmaxml/addon/trigger/volcano_flash": {
      "target_region_ids": [
        "対象区域を選択します。"
      ]
    },
    "jmaxml/addon/trigger/weather_alert": {
      "sub_types": [
        "種類を選択します。"
      ],
      "target_region_ids": [
        "対象区域を選択します。"
      ]
    },
    "jmaxml/filter": {
      "action_ids": [
        "受信時の動作を選択します。"
      ],
      "name": [
        "フィルター名を指定します。"
      ],
      "state": [
        "フィルターの状態を指定します。"
      ],
      "trigger_ids": [
        "受信条件を選択します。"
      ]
    },
    "jmaxml/forecast_region": {
      "code": [
        "区域コードを指定します。"
      ],
      "name": [
        "区域の名称を指定します。"
      ],
      "order": [
        "並び順を指定します。",
        "数字が小さいほど一覧ページの上位に表示されます。"
      ],
      "short_name": [
        "区域の短い名称を指定します。"
      ],
      "short_yomi": [
        "区域の短い名称のよみを指定します。"
      ],
      "state": [
        "状態を選択します。"
      ],
      "yomi": [
        "区域の名称のよみを指定します。"
      ]
    },
    "jmaxml/quake_region": {
      "code": [
        "区域コードを指定します。"
      ],
      "name": [
        "区域の名称を指定します。"
      ],
      "order": [
        "並び順を指定します。",
        "数字が小さいほど一覧ページの上位に表示されます。"
      ],
      "state": [
        "状態を選択します。"
      ],
      "yomi": [
        "区域の名称のよみを指定します。"
      ]
    },
    "jmaxml/trigger/base": {
      "in_type": [
        "受信条件の種別を選択します。"
      ],
      "name": [
        "名前を指定します。"
      ],
      "test_status": [
        "試験XMLを対象とするかどうかを選択します。",
        "有効を選択した場合、試験XMLを受信した場合にも受信時の動作が実行されます。"
      ],
      "training_status": [
        "訓練XMLを対象とするかどうかを選択します。",
        "有効を選択した場合、訓練XMLを受信した場合にも受信時の動作が実行されます。"
      ]
    },
    "jmaxml/tsunami_region": {
      "code": [
        "予報区コードを指定します。"
      ],
      "name": [
        "予報区の名称を指定します。"
      ],
      "order": [
        "並び順を指定します。",
        "数字が小さいほど一覧ページの上位に表示されます。"
      ],
      "state": [
        "状態を選択します。"
      ],
      "yomi": [
        "予報区の名称のよみを指定します。"
      ]
    },
    "jmaxml/water_level_station": {
      "code": [
        "水位観測所コードを指定します。"
      ],
      "name": [
        "水位観測所の名称を指定します。"
      ],
      "order": [
        "並び順を指定します。",
        "数字が小さいほど一覧ページの上位に表示されます。"
      ],
      "region_name": [
        "予報区域名を指定します。"
      ],
      "state": [
        "状態を選択します。"
      ]
    },
    "kana/dictionary": {
      "body": [
        "単語の表記と読みをカンマで区切って入力します（CSV 形式で入力します）。",
        "単語を改行で区切って複数個入力することができます。",
        "読みは「全角カタカナ」で入力してください。\nただし、小さい「ヵ」「ヶ」は使用できません。それぞれ「カ」「ケ」を使用してください。",
        "先頭が「#」で始まる行はコメントとみなされ、辞書に登録されません。",
        "空白行は無視します。",
        "漢字の入力例：\n大鷺県, ダイサギケン\n小鷺町, コサギマチ",
        "アルファベットの入力例：\nSHIRASAGI, シラサギ\nShirasagi, シラサギ\nshirasagi, シラサギ",
        "英大文字と小文字を区別するので、全部大文字、先頭だけ大文字、全部小文字の 3 つのパターンを登録します。"
      ],
      "name": [
        "「議会」や「施設」など、かな辞書に登録されている単語の名前を入力します。"
      ]
    },
    "key_visual/addon/page_list": {
      "kv_pause": [
        "静止時間を設定します。既定値は 4000 ミリ秒です。"
      ],
      "kv_speed": [
        "1回あたりのスライドにかかる時間を設定します。既定値は 500 ミリ秒です。",
        "大きな値を設定すると画像がゆっくりスライドします。"
      ],
      "link_target": [
        "リンクの表示形式を設定します。"
      ],
      "lower_html": [
        "リスト部分の下部に任意の内容をHTMLで記述することが可能です。"
      ],
      "upper_html": [
        "リスト部分の上部に任意の内容をHTMLで記述することが可能です。"
      ]
    },
    "key_visual/image": {
      "file_id": [
        "キービジュアル画像に利用する画像を登録します。"
      ],
      "link_url": [
        "キービジュアル画像のリンク先のURLを入力します。"
      ],
      "name": [
        "キービジュアル画像のリンク先のページ名を入力します。",
        "画像のalt属性にも利用します。"
      ]
    },
    "ldap/addon/group": {
      "ldap_dn": [
        "LDAPを利用している場合にグループのDN（識別子）を入力します。"
      ]
    },
    "ldap/addon/user": {
      "ldap_dn": [
        "LDAPを利用している場合にユーザーのDN（識別子）を入力します。"
      ]
    },
    "mail_page/addon/arrival_plan": {
      "arrival_close_date": [
        "表示を終了する日時を指定します。"
      ],
      "arrival_start_date": [
        "緊急情報パーツに表示を開始する日時を指定します。"
      ]
    },
    "mail_page/addon/mail_setting": {
      "arrival_days": [
        "取込ページの緊急情報パーツ表示期間を設定します。"
      ],
      "mail_page_from_conditions": [
        "メール取込の送信者メールアドレス（From）条件を設定します。",
        "メールアドレスもしくはホスト名を設定し、取り込んだメールの受信アドレスと一致した際にページを作成します。"
      ],
      "mail_page_to_conditions": [
        "メール取込の宛先メールアドレス（To）条件を設定します。",
        "メールアドレスもしくはホスト名を設定し、取り込んだメールの送信アドレスと一致した際にページを作成します。"
      ]
    },
    "map/addon/page": {
      "map_points": [
        "地図内に表示するマーカーを設定します。",
        "地図をクリックし「マーカーの設定」を選択することでマーカーを地図上に配置します。",
        null,
        "座標を直接入力しマーカーを設定する場合は、「座標」入力欄にカンマ(,)区切りで緯度経度を入力します。",
        "例:33.8957612,133.6806607",
        null,
        "マーカー名、説明にはマーカーの吹き出しテキストを入力します。",
        "「マーカーを追加する」を選択することで複数のマーカーを設定することが可能です。"
      ],
      "map_points_no_api": [
        "地図内に表示するマーカーを設定します。",
        null,
        "「座標」入力欄にカンマ(,)区切りで緯度経度を入力します。",
        "例:33.8957612,133.6806607",
        null,
        "マーカー名、説明にはマーカーの吹き出しテキストを入力します。",
        "「マーカーを追加する」を選択することで複数のマーカーを設定することが可能です。"
      ]
    },
    "member/addon/blog/blog_setting": {
      "page_limit": [
        "ページ表示件数を設定します。"
      ]
    },
    "member/addon/blog/genre": {
      "genres": [
        "ジャンルを設定します。"
      ]
    },
    "member/addon/blog/location": {
      "blog_page_locations": [
        "地域を設定します。"
      ]
    },
    "member/addon/blog/page_setting": {
      "blog_page_locations": [
        "ブログの地域を設定します。"
      ],
      "description": [
        "ブログの紹介文を設定します。"
      ],
      "genres": [
        "ブログのジャンルを改行区切りで設定します。",
        "設定したジャンルはページ作成時に選択できます。"
      ],
      "image_id": [
        "ブログのサムネイルを設定します。"
      ]
    },
    "member/addon/facebook_oauth": {
      "facebook_client_id": [
        "Facebook でアプリケーションを作成した際に付与される App ID を設定します。",
        "Facebook でアプリケーションを作成するには、https://developers.facebook.com/ にブラウザでアクセスします。"
      ],
      "facebook_client_secret": [
        "Facebook でアプリケーションを作成した際に付与される App Secret を設定します。",
        "Facebook でアプリケーションを作成するには、https://developers.facebook.com/ にブラウザでアクセスします。"
      ],
      "facebook_oauth": [
        "Facebook による OAuth 認証を有効にするかどうかを指定します。",
        "有効にした場合、Facebook アカウントでログインすることができます。"
      ]
    },
    "member/addon/form_auth": {
      "form_auth": [
        "メールアドレスとパスワードによるフォーム認証を有効にするかどうかを指定します。",
        "有効にした場合、「メンバー」に登録されているアカウント情報でログインすることができます。"
      ]
    },
    "member/addon/github_oauth": {
      "github_client_id": [
        "GitHub でアプリケーションを作成した際に付与される「Client ID」を設定します。",
        "GitHub でアプリケーションを作成するには、https://github.com/settings/developers にブラウザでアクセスします。"
      ],
      "github_client_secret": [
        "GitHub でアプリケーションを作成した際に付与される「Client Secret」を設定します。",
        "GitHub でアプリケーションを作成するには、https://github.com/settings/developers にブラウザでアクセスします。"
      ],
      "github_oauth": [
        "GitHub による OAuth 認証を有効にするかどうかを指定します。",
        "有効にした場合、GitHub アカウントでログインすることができます。"
      ]
    },
    "member/addon/google_oauth": {
      "google_oauth2_client_id": [
        "Google でアプリケーションを作成した際に付与される「クライアントID」を設定します。",
        "Google でアプリケーションを作成するには、https://console.developers.google.com/ にブラウザでアクセスします。"
      ],
      "google_oauth2_client_secret": [
        "Google でアプリケーションを作成した際に付与される「クライアントシークレット」を設定します。",
        "Google でアプリケーションを作成するには、https://console.developers.google.com/ にブラウザでアクセスします。"
      ],
      "google_oauth2_oauth": [
        "Google による OAuth 認証を有効にするかどうかを指定します。",
        "有効にした場合、Google アカウントでログインすることができます。"
      ]
    },
    "member/addon/group_invitation_setting": {
      "group_invitation_signature": [
        "メールの末尾につける署名を設定します。"
      ],
      "group_invitation_subject": [
        "メールの件名を設定します。"
      ],
      "group_invitation_template": [
        "メールのテンプレートを設定します。",
        "下記のように記述します。\n#{sender_name}　招待した人の名前が表示されます。\n#{sender_email}　招待した人のメールアドレスが表示されます。\n#{group_name}　招待するグループ名が表示されます。\n#{invitation_message}　招待するグループの招待メッセージが表示されます。\n#{accept_url}　グループへの招待を承諾するための URL が表示されます。\n#{reject_url}　グループへの招待を辞退するための URL が表示されます。\n\n使用例：\n#{sender_name} さんがあなたをグループへ招待しました。\n\n#{invitation_message}\n\nグループに参加する場合は、下の URL をクリックしてください。\n#{accept_url}\n\nグループへの参加を辞退する場合は、下の URL をクリックしてください。\n#{reject_url}\n\nこのメールに覚えのない方は、お手数ですが本メールを削除してください。"
      ]
    },
    "member/addon/login_link": {
      "login_link_url": [
        "ログインURLを設定します。",
        null,
        "未設定の場合、次の順にログイン URL を検索し最初に見つかった URL を使用します。",
        "1) 親フォルダーのリダイレクトURL",
        "2) メンバー/マイページフォルダーの URL"
      ]
    },
    "member/addon/member_invitation_setting": {
      "member_invitation_signature": [
        "メールの末尾につける署名を設定します。"
      ],
      "member_invitation_subject": [
        "メールの件名を設定します。"
      ],
      "member_invitation_template": [
        "メールのテンプレートを設定します。",
        "下記のように記述します。\n#{sender_name}　招待した人の名前が表示されます。\n#{sender_email}　招待した人のメールアドレスが表示されます。\n#{group_name}　招待するグループ名が表示されます。\n#{invitation_message}　招待するグループの招待メッセージが表示されます。\n#{registration_url}　会員登録するための URL が表示されます。\n\n使用例：\n#{sender_name} さんがあなたを招待しました。\n\n#{invitation_message}\n\n会員登録する場合は、下の URL をクリックしてください。\n#{registration_url}\n\nこのメールに覚えのない方は、お手数ですが本メールを削除してください。"
      ],
      "member_joins_to_invited_group": [
        "会員登録完了時に招待されたグループへ自動的に参加するかどうかを指定します。",
        "「自動」を指定すると、会員登録完了後、自動的にグループへも参加します。"
      ]
    },
    "member/addon/photo/slide": {
      "node_url": [
        "フォトフォルダーのURLを設定します。",
        "マルチテナントの場合、他サイトのURLを設定することでスライド表示が可能です。"
      ]
    },
    "member/addon/redirection": {
      "redirect_url": [
        "認証に成功した際のリダイレクト先を指定します。",
        null,
        "基本的には呼び出し元へ戻りますが、",
        "呼び出し元が特定できない場合、「リダイレクトURL」に指定された URL にリダイレクトします。"
      ]
    },
    "member/addon/registration/completed": {
      "completed_lower_text": [
        "下部確認テキストを設定します。"
      ],
      "completed_subject": [
        "件名を設定します。"
      ],
      "completed_upper_text": [
        "上部確認テキストを設定します。"
      ]
    },
    "member/addon/registration/notice": {
      "notice_email": [
        "メンバーの登録申請を通知する先のメールアドレスを入力します。"
      ],
      "notice_state": [
        "メンバーの登録申請通知を使用するか設定します。"
      ]
    },
    "member/addon/registration/reply": {
      "reply_lower_text": [
        "下部確認テキストを設定します。"
      ],
      "reply_subject": [
        "件名を設定します。"
      ],
      "reply_upper_text": [
        "上部確認テキストを設定します。"
      ]
    },
    "member/addon/registration/required_fields": {
      "addr_required": [
        "住所の入力を必須とする場合、「必須」を選択します。"
      ],
      "birthday_required": [
        "生年月日の入力を必須とする場合、「必須」を選択します。"
      ],
      "job_required": [
        "職種の入力を必須とする場合、「必須」を選択します。"
      ],
      "kana_required": [
        "氏名（ふりがな）の入力を必須とする場合、「必須」を選択します。"
      ],
      "organization_name_required": [
        "会社、団体名の入力を必須とする場合、「必須」を選択します。"
      ],
      "postal_code_required": [
        "郵便番号の入力を必須とする場合、「必須」を選択します。"
      ],
      "sex_required": [
        "性別の入力を必須とする場合、「必須」を選択します。"
      ],
      "tel_required": [
        "電話番号の入力を必須とする場合、「必須」を選択します。"
      ]
    },
    "member/addon/registration/reset_password": {
      "reset_password_lower_text": [
        "下部確認テキストを設定します。"
      ],
      "reset_password_subject": [
        "件名を設定します。"
      ],
      "reset_password_upper_text": [
        "上部確認テキストを設定します。"
      ]
    },
    "member/addon/registration/sender_address": {
      "sender_email": [
        "送信メールアドレスを設定します。"
      ],
      "sender_name": [
        "送信者名を設定します。"
      ],
      "sender_signature": [
        "署名を設定します。"
      ]
    },
    "member/addon/twitter_oauth": {
      "twitter_client_id": [
        "Twitter でアプリケーションを作成した際に付与される Consumer Key を設定します。",
        "Twitter でアプリケーションを作成するには、https://apps.twitter.com/ にブラウザでアクセスします。"
      ],
      "twitter_client_secret": [
        "Twitter でアプリケーションを作成した際に付与される Consumer Secret を設定します。",
        "Twitter でアプリケーションを作成するには、https://apps.twitter.com/ にブラウザでアクセスします。"
      ],
      "twitter_oauth": [
        "Twitter による OAuth 認証を有効にするかどうかを指定します。",
        "有効にした場合、Twitter アカウントでログインすることができます。"
      ]
    },
    "member/addon/yahoo_jp_oauth": {
      "yahoojp_client_id": [
        "Yahoo! JAPAN でアプリケーションを作成した際に付与される「アプリケーションID」を設定します。",
        "Yahoo! JAPAN でアプリケーションを作成するには、http://developer.yahoo.co.jp/ にブラウザでアクセスします。"
      ],
      "yahoojp_client_secret": [
        "Yahoo! JAPAN でアプリケーションを作成した際に付与される「シークレット」を設定します。",
        "Yahoo! JAPAN でアプリケーションを作成するには、http://developer.yahoo.co.jp/ にブラウザでアクセスします。"
      ],
      "yahoojp_oauth": [
        "Yahoo! JAPAN による OAuth 認証を有効にするかどうかを指定します。",
        "有効にした場合、Yahoo! JAPAN アカウントでログインすることができます。"
      ]
    },
    "member/photo": {
      "caption": [
        "画像のキャプションを設定します。"
      ],
      "image_id": [
        "画像を設定します。"
      ],
      "license_name": [
        "ライセンスを設定します。",
        "フォルダーに設定したテキストが表示されます。"
      ],
      "listable_state": [
        "一覧及びフォトサーチの検索結果に表示するかを設定します。"
      ],
      "photo_categories": [
        "画像のカテゴリを設定します。"
      ],
      "photo_locations": [
        "画像の地域を設定します。"
      ],
      "slide_order": [
        "スライドに表示する際の並び順を設定します。"
      ],
      "slideable_state": [
        "フォトスライドパーツに表示するかを設定します。"
      ]
    },
    "opendata/addon/app_page_setting": {
      "show_point": [
        "ポイントを表示するかどうかを選択します。",
        "未選択の場合、ポイントを表示します。"
      ],
      "show_tabs": [
        "表示するタブを選択します。"
      ]
    },
    "opendata/addon/category_setting": {
      "categories_limit": [
        "データセットに設定できる末端の分野数の上限を設定します。",
        "空欄 および 0 は無制限です。"
      ]
    },
    "opendata/addon/counter_html": {
      "html": [
        "HTMLを設定します。",
        "下記のテンプレートが使用可能です。\n#{dataset_count}　データセット件数が表示されます。\n#{dataset_tag_count}　データセットのタグ件数が表示されます。\n#{dataset_group_count}　データセットのグループ件数が表示されます。\n#{estat_dataset_count}　eStat分野が設定されたデータセット件数が表示されます。\n#{estat_dataset_tag_count}　eStat分野が設定されたデータセットのタグ件数が表示されます。\n#{estat_dataset_group_count}　eStat分野が設定されたデータセットのグループ件数が表示されます。\n#{app_count}　アプリ件数が表示されます。\n#{app_tag_count}　アプリのタグ件数が表示されます。\n#{idea_count}　アイデア件数が表示されます。\n#{idea_tag_count}　アイデアのタグ件数が表示されます。"
      ]
    },
    "opendata/addon/dataset_page_setting": {
      "show_point": [
        "ポイントを表示するかどうかを選択します。",
        "未選択の場合、ポイントを表示します。"
      ],
      "show_tabs": [
        "表示するタブを選択します。"
      ]
    },
    "opendata/addon/estat_category_setting": {
      "estat_categories_limit": [
        "データセットに設定できる末端のeStat分野数の上限を設定します。",
        "空欄 および 0 は無制限です。"
      ],
      "st_estat_categories": [
        "フォルダー下で使用するカテゴリーを設定します。",
        "設定されていない場合は全カテゴリーが対象となります。"
      ]
    },
    "opendata/addon/harvest/importer_area_setting": {
      "default_area_ids": [
        "既定の地域を設定します。"
      ]
    },
    "opendata/addon/harvest/importer_category_setting": {
      "default_category_ids": [
        "既定の分野を設定します。"
      ]
    },
    "opendata/addon/harvest/importer_estat_category_setting": {
      "default_estat_category_ids": [
        "既定のeStat分野を設定します。"
      ]
    },
    "opendata/addon/idea_page_setting": {
      "show_point": [
        "ポイントを表示するかどうかを選択します。",
        "未選択の場合、ポイントを表示します。"
      ],
      "show_tabs": [
        "表示するタブを選択します。"
      ]
    },
    "opendata/addon/list_node_setting": {
      "limit": [
        "リストの表示件数を指定します。"
      ]
    },
    "opendata/addon/update_plan": {
      "update_plan": "更新頻度を入力します。",
      "update_plan_date": [
        "更新予定日を入力します。",
        "更新予定日のメール通知が有効の場合、メール通知されます。",
        "",
        "毎月　：更新予定日 から １ヶ月毎",
        "四半期：更新予定日 から ３ヶ月毎",
        "毎年　：更新予定日 から １年毎",
        "２年毎：更新予定日 から ２年毎",
        "３年毎：更新予定日 から ３年毎",
        "４年毎：更新予定日 から ４年毎",
        "５年毎：更新予定日 から ５年毎",
        "空欄　：更新予定日"
      ],
      "update_plan_mail_state": "更新予定日のメール通知を設定します。"
    },
    "opendata/app": {
      "tags": [
        "関連する単語を登録します。",
        "カンマ、スペースで区切ることにより複数の単語を設定することができます。"
      ],
      "text": [
        "アプリの説明を入力します。",
        "URLは自動的にリンクが設定されます。"
      ]
    },
    "opendata/appfile": {
      "text": [
        "ファイルの説明を入力します。",
        "URLは自動的にリンクが設定されます。"
      ]
    },
    "opendata/cms_ref/page": {
      "assoc_method": [
        "連携確認方法を選択します。",
        "自動を選択すると、CMS の記事との連携が自動で確認され、記事が削除されたり非公開になったりした場合、自動的にデータセットが非公開になります。また、リソースは自動的に記事の添付ファイルと連動するようになります。",
        "手動を選択すると、CMS の記事との連携が自動では確認されません。"
      ]
    },
    "opendata/csv2rdf_settings": {
      "rdf_property": [
        "適切な RDF プロパティを一覧内から選択し、「保存」ボタンをクリックします。"
      ]
    },
    "opendata/dataset": {
      "creator_name": [
        "データ作成者を入力します。"
      ],
      "tags": [
        "関連する単語を登録します。",
        "カンマ、スペースで区切ることにより複数の単語を設定することができます。"
      ],
      "text": [
        "データセットの説明を入力します。",
        "URLは自動的にリンクが設定されます。"
      ]
    },
    "opendata/harvest/exporter": {
      "api_key": [
        "APIキーを設定します。"
      ],
      "api_type": [
        "APIを設定します。"
      ],
      "name": [
        "名前を設定します。"
      ],
      "order": [
        "並び順を設定します。"
      ],
      "url": [
        "URLを設定します。"
      ]
    },
    "opendata/harvest/importer": {
      "api_type": [
        "APIを設定します。"
      ],
      "basicauth_password": [
        "Basic認証のパスワードを設定します。"
      ],
      "basicauth_state": [
        "Basic認証のステータスを設定します。"
      ],
      "basicauth_username": [
        "Basic認証のユーザー名を設定します。"
      ],
      "name": [
        "名前を設定します。"
      ],
      "order": [
        "並び順を設定します。"
      ],
      "resource_size_limit_mb": [
        "最大リソースサイズを設定します。",
        "サイズを超えたリソースは外部リンクとしてインポートされます。"
      ],
      "source_url": [
        "URLを設定します。"
      ],
      "state": [
        "ステータスを設定します。",
        "無効に設定すると定期実行の際に無視されます。"
      ]
    },
    "opendata/idea": {
      "tags": [
        "関連する単語を登録します。",
        "カンマ、スペースで区切ることにより複数の単語を設定することができます。"
      ],
      "text": [
        "コメント内容を入力します。",
        "URLは自動的にリンクが設定されます。"
      ]
    },
    "opendata/license": {
      "name": [
        "ライセンス名を入力します。"
      ],
      "order": [
        "表示順を入力します。",
        "数字が小さいほど上位に表示されます。"
      ],
      "related_url": [
        "登録するライセンスの公式ページや説明ページのURLを登録します。"
      ]
    },
    "opendata/part/dataset": {
      "loop_html": [
        "自動生成されたリスト表示部分のHTMLを指定することが可能です。",
        "下記のように記述します。\n#{class}　リンク先のファイル名が表示されます。ファイル名に拡張子がある場合、拡張子を除いた部分が表示されます。\n#{date}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.default}　リンク先のページの公開日時が「2015/4/1」の形式で表示されます。\n#{date.iso}　リンク先のページの公開日時が「2015-04-01」の形式で表示されます。\n#{date.long}　リンク先のページの公開日時が「2015年4月1日」の形式で表示されます。\n#{date.short}　リンク先のページの公開日時が「4/1」の形式で表示されます。\n#{time}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.default}　リンク先のページの公開日時が「2015/4/1 12:34」の形式で表示されます。\n#{time.iso}　リンク先のページの公開日時が「2015-4-1 12:34」の形式で表示されます。\n#{time.long}　リンク先のページの公開日時が「2015年4月1日 12時34分」の形式で表示されます。\n#{time.short}　リンク先のページの公開日時が「15/04/01 12:34」の形式で表示されます。\n#{url}　リンク先ページのURLが表示されます。\n#{name}　リンク先ページのタイトルが表示されます。\n#{index_name}　リンク先ページの一覧用タイトルが表示されます。未設定の場合はタイトルが表示されます。\n#{summary}　リンク先ページのSummaryが表示されます。\n#{html}　リンク先ページの本文が表示されます。\n#{current}　現在訪問しているページとURLが同一の場合、classにcurrentが付与されます。\n#{new}　リンク先のページ公開日時がNEWマーク期間の範囲内の場合、classにnewが付与されます。\n#{id}　リンク先のファイルIDが表示されます。\n#{group}　リンク先ページの所有グループが表示されます。\n#{groups}　リンク先ページの全ての所有グループが表示されます。\n#{img.src}　リンク先ページ内に画像が存在する場合、リンク先ページの先頭の画像が表示されます。それ以外の場合、既定のパスが表示されます。\n#{categories}　リンク先ページ内がカテゴリに関連付けられている場合、リンク先ページのカテゴリリストが表示されます。\n#{pages.count}　リンク先ページ内にページが存在する場合、リンク先ページ内のページ数が表示されます。\n#{event_dates} イベント日が「2015/4/1」の形式で表示されます。\n#{event_dates.default} イベント日が「2015/4/1」の形式で表示されます。\n#{event_dates.default_full} イベント日が「2015/4/1 (水)」の形式で表示されます。\n#{event_dates.iso} イベント日が「2015-4-1」の形式で表示されます。\n#{event_dates.iso_full} イベント日が「2015-4-1 (水)」の形式で表示されます。\n#{event_dates.long} イベント日が「2015年4月1日」の形式で表示されます。\n#{event_dates.full} イベント日が「2015年4月1日 (水)」の形式で表示されます。\n#{event_deadline} イベントの締切日が「2015/4/1 12:34」の形式で表示されます。\n#{event_deadline.default} イベントの締切日が「2015/4/1 12:34」の形式で表示されます。\n#{event_deadline.iso} イベントの締切日が「2015-4-1 12:34」の形式で表示されます。\n#{event_deadline.long} イベントの締切日が「2015年4月1日 12時34分」の形式で表示されます。\n#{event_deadline.short} イベントの締切日が「15/04/01 12:34」の形式で表示されます。\n#{tags} リンク先ページのタグが表示されます。\n\n#{class_categories} リンク先ページ内が分野に関連付けられている場合、全てのカテゴリのフォルダ名が表示されます。\n#{class_estat_categories} リンク先ページ内がeStat分野に関連付けられている場合、全てのカテゴリのフォルダ名が表示されます。\n#{dataset_point} データセットのいいね！数が表示されます。\n#{dataset_downloaded} データセットのダウンロード数が表示されます。"
      ]
    },
    "opendata/resource": {
      "format": [
        "ファイルのフォーマットを半角英数の大文字で入力します。",
        "「 TTL 」を入力した場合はRDFサーバにデータが登録されます。"
      ],
      "order": [
        "並び順を入力します。",
        "数字が小さい順に表示されます。"
      ],
      "source_url": [
        "リソースが外部サイトに存在する場合、リソースのURLを入力します。",
        "この項目を設定した場合、リソースファイルを登録する必要はありません。"
      ],
      "text": [
        "リソースの説明を入力します。",
        "URLは自動的にリンクが設定されます。"
      ],
      "tsv_id": [
        "TSV、CSVファイルを登録しておくとデータセットのページでプレビュー表示ができます。",
        "リソースファイルがTSV、CSVファイルの場合は登録する必要はありません。"
      ]
    },
    "rdf/class": {
      "comments": "クラスの説明を入力します。",
      "label_en": "英語名称を入力します。",
      "label_ja": "日本語名称を入力します。",
      "name": "RDF ファイル出力用の名称を入力します。慣例で名称の末尾には「型」を付けます。",
      "sub_class": "継承するクラスを入力します。「継承を変更する」ボタンをクリックし、表示されるものの中から選択してください。"
    },
    "rdf/prop": {
      "comments": "プロパティの説明を入力します。",
      "label_en": "英語名称を入力します。",
      "label_ja": "日本語名称を入力します。",
      "name": "RDF ファイル出力用の名称を入力します。",
      "range": "プロパティの型を入力します。「値域を変更する」ボタンをクリックし、表示されるものの中から選択してください。"
    },
    "rdf/vocab": {
      "comments": "語彙の説明を入力します。",
      "creator_homepage": "作成者のホームページ入力します。",
      "creator_name_en": "作成者を英語で入力します。",
      "creator_name_ja": "作成者を日本語で入力します。",
      "label_en": "英語名称を入力します。",
      "label_ja": "日本語名称を入力します。",
      "license": "語彙のライセンスを入力します。",
      "prefix": "プレフィックスを入力します。RDF 変換した際に TTL ファイルで用いられるプレフィックスです。",
      "published": "語彙の出版日を入力します。",
      "uri": "この語彙を一意に識別する URI を入力します。RDF 変換した際に TTL ファイルで用いられる URI です。",
      "version": "語彙のバージョンを入力します。"
    },
    "recommend/addon/content_list": {
      "exclude_paths": [
        "一覧表示から除外するリンクを設定できます。",
        "パスを改行区切りで入力してください。",
        "",
        "入力例：\n/page.html\n/docs/page.html"
      ]
    },
    "rss/addon/anpi_mail_setting": {
      "anpi_mail": [
        "安否メールフォルダーを指定します。",
        "指定したフォルダーから安否メールを送信します。"
      ],
      "earthquake_intensity": [
        "安否メールを送信する震度を指定します。",
        "指定された震度以上の地震が対象地域内で観測された場合、安否メールを送信します。"
      ],
      "loop_mail_text": [
        "安否確認メールのループメールを指定します。",
        "下記のように記述します。\n#{target_time}　地震発生日が「2015年4月1日 12時34分」の形式で表示されます。\n#{anpi_post_url}　安否投稿 URL が表示されます。\n#{area_name}　地震発生地域が表示されます。\n#{intensity_label}　震度が表示されます。\n\n使用例：\n#{area_name}：震度 #{intensity_label}"
      ],
      "lower_mail_text": [
        "安否確認メールの下部メールを指定します。",
        "下記のように記述します。\n#{target_time}　地震発生日が「2015年4月1日 12時34分」の形式で表示されます。\n#{anpi_post_url}　安否投稿 URL が表示されます。\n\n使用例：\n下記の URL にアクセスし、安否を入力してください。\n#{anpi_post_url}"
      ],
      "my_anpi_post": [
        "安否掲示板フォルダーを指定します。",
        "安否確認メールに指定したフォルダーの URL を記載します。"
      ],
      "target_regions": [
        "指定された震度以上の地震が対象地域内で観測された場合、安否メールを送信します。"
      ],
      "title_mail_text": [
        "安否確認メールの件名を指定します。",
        "下記のように記述します。\n#{target_time}　地震発生日が「2015年4月1日 12時34分」の形式で表示されます。\n\n使用例：\n#{target_time} ころ地震がありました"
      ],
      "upper_mail_text": [
        "安否確認メールの上部メールを指定します。",
        "下記のように記述します。\n#{target_time}　地震発生日が「2015年4月1日 12時34分」の形式で表示されます。\n#{anpi_post_url}　安否投稿 URL が表示されます。\n\n使用例：\n#{target_time} ころ地震がありました。\n各地の震度は下記の通りです。"
      ]
    },
    "rss/addon/import": {
      "rss_max_docs": [
        "最大保存件数を設定します。",
        null,
        "RSS を取り込んだ際に記事数が「最大保存件数」を超えた場合、公開日時の古い順に記事を削除し、記事数が「最大保存件数」以下になるように調整します。",
        null,
        "「最大保存件数」に 0 を指定すると、無制限に記事を保存します。"
      ],
      "rss_refresh_method": [
        "RSS取り込みの更新方法を指定します。",
        "手動の場合は、管理画面上でインポートを行うことで取り込みを行います。",
        "自動の場合は、インストール時に設定した周期で自動で取り込みを行います。"
      ],
      "rss_url": [
        "RSS配信URLを設定します。",
        null,
        "次の RSS 形式をサポートしています。",
        "・RSS 2.0",
        "・Atom",
        "・RDF"
      ]
    },
    "rss/addon/page/body": {
      "html": [
        "本文を設定します。",
        null,
        "「本文」は公開画面に表示されませんが、「本文」に設定した文字列は「サイト内検索」で検索することができます。",
        "取り込んだ RSS 記事を管理しやすくすることができます。"
      ],
      "rss_link": [
        "ソースURLを設定します。"
      ]
    },
    "rss/addon/pub_sub_hubbub": {
      "hub_url": [
        "Hub URL を指定します。",
        "例 http://pubsubhubbub.appspot.com/subscribe"
      ],
      "lease_seconds": [
        "購読が有効な期間を秒で指定します。",
        "設定した秒数経過すると、再度、Hub より購読確認が実施されます。",
        "この設定は Hub がサポートしている場合もあれば、サポートしていない場合もあります。"
      ],
      "rss_max_docs": [
        "最大保存件数を設定します。",
        null,
        "RSS を取り込んだ際に記事数が「最大保存件数」を超えた場合、公開日時の古い順に記事を削除し、記事数が「最大保存件数」以下になるように調整します。",
        null,
        "「最大保存件数」に 0 を指定すると、無制限に記事を保存します。"
      ],
      "secret": [
        "秘密鍵を指定します。",
        "秘密鍵を指定すると、認証された RSS を受け取ることができるようになります。"
      ],
      "topic_urls": [
        "購読する RSS の URL を指定します。"
      ]
    },
    "search_contents": {
      "files": {
        "keyword": [
          "検索を行う文字列を入力します。",
          "検索文字をファイル名に含むファイルを検索します。"
        ]
      },
      "html": {
        "keyword": [
          "検索を行う文字列を入力します。",
          "検索文字をHTMLに含むページ、パーツ、レイアウトを検索します。",
          "検索と置換の対象となる項目は以下です。\nページ：タイトル、本文、連絡先、FAQの質問回答\nパーツ：タイトル、HTML、上部下部HTML\nレイアウト:タイトル、HTML"
        ],
        "option": [
          "検索時に検索文字の形式を設定します。\n未設定時は通常のテキスト検索となります。",
          "URL選択時は '=\"検索文字' でテキスト検索を行います"
        ],
        "replacement": [
          "置換後の文字列を入力します。",
          "検索を行った後、置換を行うページ、パーツ、レイアウトにチェックを入れ全置換ボタンをクリックします。"
        ]
      }
    },
    "sitemap/addon/body": {
      "sitemap_deny_urls": [
        "一覧に表示しないURLを設定します。",
        "前方一致したURLを除外します。",
        "正規表現での入力が可能です。",
        null,
        "例：ページのURLを指定して除外",
        "/docs/123.html",
        "例：/docs/内でindex.html以外のページを除外",
        "/docs/."
      ],
      "sitemap_depth": [
        "表示する最大階層数を設定します。",
        "最大5階層まで設定できます。"
      ],
      "sitemap_export_urls": [
        "設定した条件を元にURLリストを出力します。",
        "URLリストを未入力にすると自動的にリストを作成します。",
        "サイトマップを自動更新したい場合はURLリストを未入力にします。"
      ],
      "sitemap_page_state": [
        "一覧にページを含めるかを設定します。",
        "「非表示」の場合はフォルダーのみ表示されます。"
      ],
      "sitemap_urls": [
        "表示するURLのリストを設定します。",
        "URLの後ろに「#ページ名」を付けると表示名を変更できます。",
        null,
        "例：/docs/ に別名を設定",
        "/docs/ #新着記事"
      ]
    },
    "ss/addon/approve_setting": {
      "close_confirmation": [
        "下書き保存時の警告表示を設定します。"
      ],
      "forced_update": [
        "メールアドレスが設定されていない場合の承認について設定します。",
        "設定すると実行時の注意を無視します。"
      ]
    },
    "ss/addon/elasticsearch/site_setting": {
      "elasticsearch_deny": [
        "検索対象から除外するページのパスを入力します。",
        "改行区切りで入力します。"
      ]
    },
    "ss/addon/facebook_setting": {
      "facebook_app_id": [
        "Facebook の App Id を設定します。",
        "設定すると「Facebook インサイト」でアクセスを解析できるようになります。"
      ],
      "facebook_page_url": [
        "Facebook ページの URL を設定します。",
        "設定するとシェアされた記事を見た別のユーザーが「いいね！」をすることができます。"
      ],
      "opengraph_defaul_image_url": [
        "既定の画像のURL を設定します。",
        "ページに画像が含まれていない場合、ここで設定した URL が og:image として使用されます。",
        "ページに画像が含まれている場合、ここで設定した URL は使用されません。"
      ],
      "opengraph_type": [
        "Open Graph 形式を選択します。",
        "Facebook でどのような見え方をするかは「Facebook Sharing Debugger（https://developers.facebook.com/tools/debug/sharing/）」で確認することができます。"
      ]
    },
    "ss/addon/file_setting": {
      "file_resizing": [
        "ページの添付ファイル（アップロード）のリサイズにてデフォルトサイズを設定できます。",
        "幅、高さ共に200が最小値になります。"
      ],
      "multibyte_filename_state": [
        "日本語ファイルのアップロードを設定できます。",
        null,
        "アップロード可: 日本語ファイルはアップロード可ですが、日本語部分がアンダースコアに置き換わります。既定の動作です。",
        "アップロード不可: 日本語ファイルをアップロードすることができなくなり、英数字・ハイフン・アンダースコアのみで構成されたファイルのみをアップロードすることができるようになります。"
      ]
    },
    "ss/addon/kana_setting": {
      "kana_format": [
        "かな機能にて公開画面にふりがなを付与した際の表記形式を設定します。"
      ]
    },
    "ss/addon/map_setting": {
      "map_api": [
        "サイトで使用する地図APIを選択します。"
      ],
      "map_api_key": [
        "地図APIで使用するAPIキーを入力します。",
        "GoogleマップのAPIキーはこの項目に設定します。"
      ]
    },
    "ss/addon/mobile_setting": {
      "mobile_css": [
        "モバイルページで使用するCSSパスを設定できます。",
        "複数の場合は改行区切りで入力します。",
        "空欄の場合は既定のCSS",
        "/css/mobile.css",
        "が設定されます。"
      ],
      "mobile_location": [
        "モバイルページのパスを設定します。"
      ],
      "mobile_size": [
        "モバイルページの最大サイズを設定します。",
        "100kbから1000kbが設定できます。"
      ],
      "mobile_state": [
        "モバイルページの有効無効を設定します。"
      ]
    },
    "ss/addon/site_auto_post_setting": {
      "site_edit_auto_post": [
        "記事編集時の自動投稿の設定を行います。"
      ],
      "site_sns_auto_delete": [
        "記事非公開時にSNSへ投稿した内容を削除します。"
      ],
      "site_twitter_auto_post": [
        "Twitterへの自動投稿の設定を行います。"
      ]
    },
    "ss/addon/trash_setting": {
      "trash_threshold": [
        "ゴミ箱の保持期間を設定できます。"
      ]
    },
    "ss/addon/twitter_setting": {
      "twitter_access_token": [
        "アクセストークン(Access Token)を設定します。",
        "Twitterへの自動投稿に必須です。"
      ],
      "twitter_access_token_secret": [
        "アクセストークンシークレット(Access Token Secret)を設定します。",
        "Twitterへの自動投稿に必須です。"
      ],
      "twitter_card": [
        "Twitter のカード形式を選択します。",
        "Twitter でどのような見え方をするかは「Twitter Card Validator（https://cards-dev.twitter.com/validator）」で確認することができます。"
      ],
      "twitter_consumer_key": [
        "コンシューマーキー(APIキー, Consumer Key, API Key)を設定します。",
        "Twitterへの自動投稿に必須です。"
      ],
      "twitter_consumer_secret": [
        "コンシューマーシークレット(APIシークレット, Consumer Secret, API Secret)を設定します。",
        "Twitterへの自動投稿に必須です。"
      ],
      "twitter_default_image_url": [
        "既定の画像のURL を設定します。",
        "ページに画像が含まれていない場合、ここで設定した URL が twitter:image として使用されます。",
        "ページに画像が含まれている場合、ここで設定した URL は使用されません。"
      ],
      "twitter_username": [
        "Twitter のユーザー名を設定します。",
        "設定すると「Twitter Card Analytics」でアクセスを解析できるようになります。"
      ]
    },
    "ss/document": {
      "body_layout_id": [
        "ページの本文レイアウトを選択します。",
        "通常レイアウトのみの利用であれば設定は不要です。"
      ],
      "close_date": [
        "公開を終了する日時を指定します。",
        "指定した日時が来るとページが非公開になります。"
      ],
      "description": [
        "検索エンジン用のページ概要の設定に利用します。"
      ],
      "domains": [
        "ドメインを設定します。"
      ],
      "filename": [
        "ファイル名はURLに利用します。",
        "半角英数字で入力します。",
        ".htmlなどの拡張子の記述は不要です。"
      ],
      "group_ids": [
        "編集を許可するグループを選択します。"
      ],
      "host": [
        "ホストを設定します。"
      ],
      "https": [
        "HTTPSの有効無効を設定します。"
      ],
      "keywords": [
        "検索エンジン用のキーワードの設定に利用します。",
        "「,」で区切ることにより複数のキーワードの設定が可能です。"
      ],
      "layout_id": [
        "ページのレイアウトを選択します。"
      ],
      "name": [
        "サイト名を入力します。"
      ],
      "order": [
        "フォルダーの並び順の設定で「指定順」を指定している場合に利用します。",
        "数字が小さいほど一覧ページの上位にリンクが表示されます。"
      ],
      "parent_id": [
        "親サイトを設定します。",
        "静的ファイルのパスを親サイトに合わせることができます。"
      ],
      "permission_level": [
        "編集を許可する権限レベルを指定します。"
      ],
      "release_date": [
        "公開を開始する日時を指定します。",
        "指定した日時が来るとページが公開されます。",
        "即時公開する場合は指定は不要です。"
      ],
      "released": [
        "ページに表示する更新日の指定に利用します。",
        "実際の更新日以外の日付を指定する場合に利用します。"
      ],
      "state": [
        "公開画面への公開、非公開を選択します。",
        "非公開を選択することで下書き状態で保存したり、公開画面から取り下げることが可能です。"
      ],
      "subdir": [
        "サブディレクトリを設定します。"
      ],
      "summary_html": [
        "一覧ページで表示するページの概要に利用します。",
        "一覧系のフォルダーのループHTMLの設定で下記のように記述した箇所に表示されます。\n#{summary}"
      ],
      "title": [
        "ページのタイトルに利用し、ブラウザのタイトルバーに表示されます。",
        "レイアウトに下記のように記述することでページに出力することが可能です。\n&lt;h1 id=\"ss-page-name\">Page Name&lt;/h1>"
      ],
      "title_for_index": [
        "一覧のタイトルに利用されます。未設定の場合はタイトルが流用されます。"
      ],
      "user_ids": [
        "編集を許可するユーザーを選択します。"
      ]
    },
    "ss/model/address": {
      "address_group_id": [
        "グループ名を入力します。"
      ],
      "company": [
        "会社を入力します。"
      ],
      "email": [
        "メールアドレスを入力します。"
      ],
      "home_city": [
        "市区町村（自宅）を入力します。"
      ],
      "home_fax": [
        "ファックス番号（自宅）を入力します。"
      ],
      "home_postal_code": [
        "郵便番号（自宅）を入力します。"
      ],
      "home_prefecture": [
        "都道府県（自宅）を入力します。"
      ],
      "home_street_address": [
        "番地（自宅）を入力します。"
      ],
      "home_tel": [
        "電話番号（自宅）を入力します。"
      ],
      "kana": [
        "カナを入力します。"
      ],
      "member_id": [
        "ユーザーを設定します。"
      ],
      "memo": [
        "メモを入力します。"
      ],
      "name": [
        "氏名を入力します。"
      ],
      "office_city": [
        "市区町村（勤務先）を入力します。"
      ],
      "office_fax": [
        "ファックス番号（勤務先）を入力します。"
      ],
      "office_postal_code": [
        "郵便番号（勤務先）を入力します。"
      ],
      "office_prefecture": [
        "都道府県（勤務先）を入力します。"
      ],
      "office_street_address": [
        "番地（勤務先）を入力します。"
      ],
      "office_tel": [
        "電話番号（勤務先）を入力します。"
      ],
      "personal_webpage": [
        "WEBページを入力します。"
      ],
      "tel": [
        "携帯電話番号を入力します。"
      ],
      "title": [
        "役職を入力します。"
      ]
    },
    "ss/model/editor_setting": {
      "color_button": [
        "文字色変更ボタンの表示を設定します。"
      ],
      "editor_css_path": [
        "エディタ用スタイルシートのパスを設定します。"
      ],
      "syntax_check": [
        "アクセシビリティチェックの有効無効を設定します。"
      ]
    },
    "ss/model/file": {
      "filename": [
        "ファイル名（英数）を入力します。"
      ],
      "geo_location": [
        "緯度・経度を10進で入力します。"
      ],
      "in_file": [
        "ファイルを選択します。"
      ],
      "name": [
        "ファイル名を入力します。"
      ]
    },
    "ss/model/group": {
      "activation_date": [
        "有効期限の開始日を指定します。"
      ],
      "expiration_date": [
        "有効期限の終了日を指定します。"
      ],
      "name": [
        "グループの名称を入力します。"
      ],
      "order": [
        "一覧画面での表示順を指定します。",
        "数字が小さいほど一覧ページの上位にリンクが表示されます。"
      ]
    },
    "ss/model/mail_setting": {
      "mail_signature": [
        "システムから送信されるメールの既定の署名を入力します。"
      ],
      "sender_email": [
        "システムから送信されるメールの既定の差出人メールアドレスを入力します。",
        "未入力の場合、システム設定のメールアドレス（例: noreply@example.jp）が使用されます。"
      ],
      "sender_name": [
        "システムから送信されるメールの既定の差出人名を入力します。"
      ]
    },
    "ss/model/max_file_size": {
      "extensions": [
        "制限するファイルの拡張子を入力します",
        "複数の場合はスペース区切りで入力します",
        "拡張子の大文字小文字は区別されずどちらも制限対象となります"
      ],
      "name": [
        "設定名を入力します"
      ],
      "order": [
        "並び順を設定します"
      ],
      "size": [
        "最大ファイルサイズをMB単位で設定可能です"
      ],
      "state": [
        "制限の有効/無効を設定します"
      ]
    },
    "ss/model/role": {
      "in_file": [
        "CSVファイルを指定し権限のインポートを行います。",
        "idが記述されていない行は新規作成になります。"
      ],
      "name": [
        "ロール名を入力します。"
      ],
      "permissions": [
        "権限を設定します。",
        "（全て）はすべてが対象、（所有）はログインアカウントの所属するグループが作成したものが対象となります。"
      ]
    },
    "ss/model/user": {
      "account_expiration_date": [
        "有効期限の終了日を入力します。"
      ],
      "account_start_date": [
        "有効期限の開始日を入力します。"
      ],
      "address": [
        "メールアドレスを入力します。"
      ],
      "email": [
        "ユーザーのメールアドレスを設定します。",
        "ログイン時にユーザーIDもしくはメールアドレスを利用します。",
        "メールアドレスはページの承認申請等でも利用します。"
      ],
      "from": [
        "ユーザーの名称を入力します。",
        "入力された名称は、メールの差出人として表示されます。"
      ],
      "group": [
        "ユーザーの所属するグループを選択します。"
      ],
      "group_ids": [
        "ユーザーの所属するグループを選択します。"
      ],
      "imap_account": [
        "IMAPサーバーのユーザーアカウントを設定します。"
      ],
      "imap_alias": [
        "転送先メールアドレスを入力します。"
      ],
      "imap_auth_type": [
        "IMAPサーバーの認証方式を選択します。"
      ],
      "imap_default_index": [
        "このアカウントを既定のアカウントにするか選択します。"
      ],
      "imap_draft_box": [
        "下書きフォルダーとして利用するフォルダーの名前を設定します。"
      ],
      "imap_host": [
        "IMAPサーバーのホストを設定します。"
      ],
      "imap_port": [
        "IMAPサーバーの待受ポートを設定します。"
      ],
      "imap_sent_box": [
        "送信済みフォルダーとして利用するフォルダーの名前を設定します。"
      ],
      "imap_setting_name": [
        "アカウントの名称を入力します。"
      ],
      "imap_ssl_use": [
        "IMAPサーバーとの通信にSSLを使用するか選択します。"
      ],
      "imap_trash_box": [
        "ゴミ箱フォルダーとして利用するフォルダーの名前を設定します。"
      ],
      "in_imap_password": [
        "IMAPサーバーのユーザーアカウントのパスワードを設定します。"
      ],
      "in_password": [
        "ログイン時に利用するパスワードを入力します。"
      ],
      "initial_password_warning": [
        "初期パスワード警告を有効にするかどうかを選択します。"
      ],
      "kana": [
        "ユーザーのカナを入力します。"
      ],
      "lock_state": [
        "利用状態を選択します。"
      ],
      "name": [
        "ユーザーの名称を入力します。"
      ],
      "organization_id": "所属する組織を選択します。",
      "organization_uid": [
        "職員番号を入力します。",
        "サイト、グループ専用ログイン画面で使用します。"
      ],
      "remark": [
        "備考を入力します。"
      ],
      "restriction": [
        "利用制限を選択します。"
      ],
      "session_lifetime": [
        "セッションの寿命を秒数で指定します。",
        "最大 3600（1時間）です。",
        "空欄の場合は、システムの既定値が用いられます。"
      ],
      "switch_user_id": [
        "切り替えユーザーを選択します。",
        "ログイン後にユーザーが切り替わります。",
        "共通アカウントを利用する場合などに使用します。"
      ],
      "tel": [
        "ユーザーの電話番号を設定します。"
      ],
      "tel_ext": [
        "ユーザーの内線番号を設定します。"
      ],
      "threshold_mb": "メールボックスの容量の警告を設定します。\nメールボックスの容量がここで設定したサイズを上回った時に容量の警告が表示されます。\n\nメールボックスの容量が1GBの時に、900MBを設定した場合、メールボックスの使用容量が900MB以上（残り100MB以下）の時に警告が表示されます。\n\n何も設定しない場合、警告は表示されません。",
      "title_ids": [
        "役職を選択します。"
      ],
      "type": [
        "ユーザータイプを選択します。",
        "通常はSNSユーザーを選択します。",
        "LDAPを利用する場合にLDAPユーザーを選択します。"
      ],
      "uid": [
        "ユーザーIDを設定します。",
        "ログイン時にユーザーIDもしくはメールアドレスを利用します。"
      ]
    },
    "ss/model/user_title": {
      "activation_date": "有効期限の開始日時を入力します。",
      "code": "役職コードを入力します。",
      "expiration_date": "有効期限の終了日時を入力します。",
      "name": "役職名を入力します。",
      "order": [
        "並び順を入力します。",
        "数字が大きいほど上位に表示されます。"
      ],
      "remark": "備考を入力します。"
    },
    "sys/addon/environment_setting": {
      "keys": [
        "HTTP サーバーが認証したユーザー情報を設定した環境変数のキー名を設定します。"
      ]
    },
    "sys/addon/role": {
      "sys_role_ids": [
        "ユーザーのロール/権限を指定します。"
      ]
    },
    "sys/addon/saml_setting": {
      "force_authn_state": [
        "再認証を要求するかどうかを選択します。",
        "「要求する」を選択した場合、IdP はユーザーを常に認証します。",
        "「要求しない」を選択した場合、IdP はセッションが存在する場合はセッションからの ID 情報を応答し、セッションが存在しない場合はユーザーを認証します。"
      ]
    },
    "sys/auth/saml": {
      "filename": [
        "ファイル名はURLに利用します。",
        "半角英数字で入力します。",
        ".html等の拡張子の記述は不要です。"
      ],
      "name": [
        "認証の名前を設定します。"
      ],
      "order": [
        "フォルダーの並び順の設定で「指定順」を指定している場合に利用します。",
        "数字が小さいほど一覧ページの上位にリンクが表示されます。"
      ],
      "state": [
        "このシステム設定を有効にするかを設定します。"
      ],
      "text": [
        "認証の説明を記載することができます。"
      ]
    },
    "sys/model/auth": {
      "name": [
        "認証の名前を設定します。"
      ],
      "text": [
        "認証の説明を記載することができます。"
      ]
    },
    "sys/password_policy": {
      "password_limit_days": [
        "パスワードの有効日数を設定します。",
        "ここで指定した日数以内にパスワードを変更する必要があります。"
      ],
      "password_max_failure_count": [
        "ログインの最大失敗回数を設定します。",
        "この回数を超えてログインに失敗すると、当該ユーザーは利用停止状態になります。"
      ],
      "password_min_change_char_count": [
        "パスワード変更時に前回のパスワードと異ならなければならない文字数を設定します。"
      ],
      "password_min_digit_length": [
        "数字（0〜9）の最低文字数を設定します。",
        "例えば「2」を設定すると、最低でも 2 文字の数字をパスワードに含まなければならなくなります。"
      ],
      "password_min_downcase_length": [
        "英小文字（a〜z）の最低文字数を設定します。",
        "例えば「2」を設定すると、最低でも 2 文字の英小文字をパスワードに含まなければならなくなります。"
      ],
      "password_min_length": [
        "パスワードの最低文字数を設定します。",
        "ここで指定した文字数以上のパスワードを設定しなければならなくなります。",
        "例えば「8」を設定すると、パスワードの長さは 8 文字以上でなければならなくなります。"
      ],
      "password_min_symbol_length": [
        "記号の最低文字数を設定します。",
        "例えば「2」を設定すると、最低でも 2 文字の記号をパスワードに含まなければならなくなります。"
      ],
      "password_min_upcase_length": [
        "英大文（A〜Z）の最低文字数を設定します。",
        "例えば「2」を設定すると、最低でも 2 文字の英大文字をパスワードに含まなければならなくなります。"
      ],
      "password_prohibited_char": [
        "パスワードに利用できない文字を設定します。",
        "例えば「xyz」を設定すると、パスワードとして x, y, z の各文字を利用できなくなります。"
      ],
      "password_warning_days": [
        "パスワードの有効期限が切れる前に、有効期限切れ警告を表示する日数を設定します。",
        "例えば「3」を設定すると、有効期限 3 日前に警告を表示します。"
      ]
    },
    "sys/role": {
      "name": [
        "ロールの名称を入力します。"
      ],
      "permissions": [
        "所持する権限を設定します。"
      ]
    },
    "sys/site_copy_task": {
      "copy_contents": [
        "複製する元となるサイトから複製する項目を選択します。"
      ],
      "source_site_id": [
        "複製の元となるサイトを選択します。"
      ],
      "target_host_domains": [
        "複製するサイトのドメインを入力します。"
      ],
      "target_host_host": [
        "複製するサイトのホスト名を入力します。"
      ],
      "target_host_name": [
        "複製するサイトの名前を入力します。"
      ]
    },
    "urgency/addon/layout": {
      "urgency_default_layout_id": [
        "通常時のレイアウトを設定します。"
      ],
      "urgency_mail_page_layout_id": [
        "メールを取り込んだ際に切り替えるレイアウトを設定します。"
      ]
    },
    "urgency/addon/mail_page": {
      "urgency_node_id": [
        "連携する緊急災害レイアウトフォルダーを設定します。"
      ],
      "urgency_state": [
        "メールを取り込んだ際に緊急災害レイアウトに切り替えるか設定します。"
      ]
    },
    "voice/file": {
      "error": "エラー",
      "last_modified": "URLの最終更新日時",
      "updated": "作成日時",
      "url": "URL"
    },
    "webmail/address": {
      "address_group_id": [
        "グループ名を入力します。"
      ]
    },
    "webmail/address_group": {
      "name": [
        "グループ名を入力します。"
      ],
      "order": [
        "並び順を入力します。"
      ]
    },
    "webmail/filter": {
      "in_file": [
        "CSVファイルを指定しフィルターのインポートを行います。"
      ]
    },
    "webmail/mailbox": {
      "name": [
        "フォルダー名を入力します。",
        "例：",
        "「フォルダー名」",
        "「親フォルダー.フォルダー名」",
        "「親フォルダー.親フォルダー.フォルダー名」"
      ],
      "parent_name": [
        "フォルダー名に親フォルダーを設定します。",
        "このプルダウンはフォルダー名の入力補助用です。"
      ]
    },
    "webmail/reference/role": {
      "webmail_role_ids": [
        "ユーザーの権限/ロールを選択します。"
      ]
    },
    "webmail/role": {
      "permission_level": [
        "権限レベルを設定します。"
      ]
    },
    "workflow/addon/approver": {
      "approve_remand": [
        "承認依頼が届いています。申請者に対するコメントを入力（任意）の上、承認または差し戻しを選択してください。"
      ],
      "circulation_step": [
        "確認依頼が届いています。申請者に対するコメントを入力（任意）の上、「確認済みにする」をクリックしてください。"
      ],
      "workflow_approvers": [
        "承認者を選択します。"
      ],
      "workflow_circulations": [
        "回覧者を選択します。",
        "回覧者へは承認後に回覧依頼の通知が送られます。"
      ],
      "workflow_comment": [
        "申請理由など承認者に対するコメントをを記述してください。"
      ],
      "workflow_routes": [
        "承認を申請するには承認経路を選択してから、選択ボタンをクリックしてください。"
      ]
    },
    "workflow/model/route": {
      "approver_attachment_uses": [
        "承認者によるファイル追加を許可する場合は「有効」を、それ以外は「無効」を選択してください。"
      ],
      "approvers": [
        "承認者を選択します。"
      ],
      "circulation_attachment_uses": [
        "回覧者によるファイル追加を許可する場合は「有効」を、それ以外は「無効」を選択してください。"
      ],
      "circulations": [
        "回覧者を選択します。"
      ],
      "group_ids": [
        "この承認経路を利用できるグループを選択します。"
      ],
      "name": [
        "承認経路の名前を入力します。"
      ],
      "on_remand": [
        "差し戻し時の動作を選択します。",
        "「最初に戻る」は、、差し戻し時、承認を最初からやり直します。これが既定の動作です。",
        "「直前に戻る」は、差し戻し時、直前のレベルからやり直します。"
      ],
      "pull_up": [
        "引き上げ承認の有効、無効を設定します。"
      ],
      "required_counts": [
        "必要承認数を入力します。",
        "「全員」を選択すると、承認者全員の承認が必要となります。",
        "「n 人」を選択すると、承認者のうち n 人以上の承認が必要となります。"
      ]
    }
  },
  "uploader": {
    "files": "ファイル",
    "links": {
      "new_directory": "新規フォルダー"
    },
    "new_directory": "新規フォルダー名",
    "new_files": "アップロード",
    "notice": {
      "invalid_ext": "ファイル拡張子が異なるため、上書き保存されません。",
      "overwrite": "ファイルは上書き保存されます。"
    }
  },
  "urgency": {
    "apis": {
      "layouts": {
        "index": "レイアウトを選択する",
        "search": "レイアウトを検索",
        "select": "レイアウトを設定する"
      }
    },
    "confirm_message": "反映してよろしいですか？",
    "default_layout": "通常時レイアウト",
    "errors": {
      "default_layout_not_found": "通常時レイアウトが設定されていません。",
      "index_page_not_found": "同階層にindex.htmlがありません。"
    },
    "layout": "緊急災害レイアウト",
    "selected_layout": "適用中",
    "switch_layout": "反映"
  },
  "views": {
    "confirm_password": {
      "password_changed": "パスワードを変更しました。\nメールアドレスとパスワードで、<a href=\"%{login_url}\">ログイン</a>してください。",
      "title": "パスワードの変更"
    },
    "ldap/import": {
      "index": "インポート"
    },
    "ldap/result": {
      "index": "同期結果"
    },
    "ldap/server": {
      "index": "サーバー情報"
    },
    "pagination": {
      "first": "&laquo;",
      "last": "&raquo;",
      "next": "次のページ",
      "previous": "前のページ",
      "truncate": "..."
    },
    "registration": {
      "complete_html": "会員登録が完了しました\n登録したメールアドレスとパスワードで、<a href=\"%{redirect_url}\">ログイン</a>してください。",
      "confirm_email_address": "%{sender_email} からメールが届きます。\n迷惑メールの防止のためメールの受信設定を行っている方は、「 %{sender_domain} 」からのメールが受信できるように、ドメイン指定受信の設定を行ってください。",
      "notify_email_address_html": "管理者による確認後、%{sender_email} から登録案内メールを %{email} に送信します。\nメールに記載の案内を読み、登録を完了してください。",
      "verify_email_address_html": "<h2>メールアドレスの確認</h2>\n%{sender_email} から登録案内メールを %{email} に送りました。\nメールに記載の案内を読み、登録を完了してください。\nしばらく待ってもメールが届かない場合は、%{sender_email} からのメールが着信拒否されていないか確認の上、<a href=\"%{resend_url}\" target=\"_blank\">こちら</a>から登録案内メールを再送信してください。"
    },
    "reset_password": {
      "description": "ご登録されている以下のメールアドレスにパスワードの再設定用のURLをお送りします。",
      "link_text_html": "パスワードをお忘れの場合は、<a href=\"%{reset_password_url}\" target=\"_blank\">こちら</a>のリンクからパスワードを再設定してください。",
      "sent_email": "%{sender_email} からパスワード再設定の案内を送りました。\nしばらく待ってもメールが届かない場合は、%{sender_email} からのメールが着信拒否されていないか確認の上、<a href=\"%{resend_url}\" target=\"_blank\">こちら</a>からパスワード再設定案内メールを再送信してください。"
    },
    "voice/error_files": {
      "index": "エラー一覧",
      "not_exists": "エラーはありません。"
    },
    "voice/files": {
      "index": "ページ一覧",
      "not_exists": "ページがありません。"
    }
  },
  "voice": {
    "error_file": "エラー一覧",
    "file": "読み上げ音声",
    "messages": {
      "no_audio_solution": "<span>更新してください</span>再生するにはブラウザを更新するか、<a href=\"http://get.adobe.com/flashplayer/\" target=\"_blank\">Flash Player</a>を更新してください。"
    },
    "synthesis_fail": {
      "empty_source": "読み上げる文字列がありません。",
      "lame": "Lame エラーが発生しました。",
      "no_lame": "Lame がインストールされていません。",
      "no_open_jtalk": "Open JTalk がインストールされていません。",
      "no_sox": "Sox がインストールされていません。",
      "open_jtalk": "Open JTalk エラーが発生しました。",
      "sox": "Sox エラーが発生しました。"
    }
  },
  "webmail": {
    "account_config": "アカウント設定",
    "account_setting": "アカウント設定",
    "box": {
      "draft": "下書き",
      "inbox": "受信トレイ",
      "sent": "送信済み",
      "trash": "ゴミ箱"
    },
    "buttons": {
      "add_account": "アカウントを追加する",
      "batch_download": "一括ダウンロード",
      "clear_cache": "キャッシュ削除",
      "clear_cache_all": "キャッシュ全削除",
      "ignore_mdn": "要求を無視する",
      "send_mdn": "開封確認を送付する",
      "sync": "同期",
      "test_connection": "接続確認"
    },
    "confirm": {
      "apply_filter": "フィルターを適用してよろしいですか？",
      "clear_cache": "キャッシュを削除してよろしいですか？",
      "empty_mailbox": "フォルダーを空にしてよろしいですか？"
    },
    "create_mailbox_for_reload": "作成されるフォルダー",
    "default_settings": "既定の設定",
    "delete_mailbox_for_reload": "削除されるフォルダー",
    "errors": {
      "blank_apply_mailbox": "適用するフォルダーを選択してください。",
      "blank_conditions": "条件を入力してください。"
    },
    "export": {
      "all_mail": "全てのメール",
      "notify_message": "ダウンロードの準備が完了しました。\n下記のURLからダウンロードしてください。\n\n%{link}",
      "select_mail": "選択したメール",
      "start_export": "エクスポートを開始しました。",
      "start_message": "エクスポート処理を開始しました。\nエクスポート処理が完了次第、ダウンロードリンクが通知されます。",
      "subject": "[メール] エクスポートが完了しました。"
    },
    "export_failed": {
      "empty_mails": "エクスポート対象のメールが見つかりませんでした。",
      "notify_message": "エクスポートが失敗しました。失敗の原因はタスク・マネージャーから確認することができます。",
      "subject": "[メッセージ] エクスポートが失敗しました。"
    },
    "history": {
      "mode": {
        "create": "登録",
        "delete": "削除",
        "login": "ログイン",
        "update": "変更"
      }
    },
    "imap_default_index": "既定アカウント",
    "import": {
      "start_import": "インポートしました。"
    },
    "links": {
      "address": {
        "copy": "メールアドレスをコピー",
        "entry": "アドレス帳に登録する",
        "send": "メッセージを作成する"
      },
      "apply": "適用する",
      "back_to_contents": "受信トレイへ戻る",
      "copy": "コピーする",
      "download": "ダウンロード",
      "edit_as_new": "新規メールとして編集",
      "empty_mailbox": "空にする",
      "etc": "その他",
      "forward": "転送する",
      "forward_gws_message": "メッセージに転送する",
      "header_view": "ヘッダー表示",
      "move": "移動する",
      "reload_mailboxes": "メールサーバと同期する",
      "reply": "返信する",
      "reply_all": "全員に返信",
      "reply_all_without_body": "全員に返信（引用なし）",
      "reply_without_body": "返信する（引用なし）",
      "select_account": "アカウント",
      "set_seen": "既読にする",
      "set_star": "スターをつける",
      "show_cc_bcc": "CC , BCC の表示",
      "show_image": "画像の表示",
      "source_view": "ソース表示",
      "unset_seen": "未読にする",
      "unset_star": "スターをはずす"
    },
    "mail": "メール",
    "mailbox": "フォルダー",
    "mailbox_root": "ルート階層",
    "message": "メッセージ",
    "no_senders": "差出人不明",
    "no_subjects": "No title",
    "notice": {
      "copy": "コピーしました。",
      "delete": "削除しました。",
      "deleted_cache": "キャッシュを削除しました。",
      "empty": "空にしました。",
      "ignore_mdn": "開封確認を無視しました。",
      "imap_login_failed": "IMAP ログインに失敗しました。",
      "move": "移動しました。",
      "multiple": {
        "copy": "%{count} 件のメールをコピーしました。",
        "delete": "%{count} 件のメールを削除しました。",
        "filtered": "%{count} 件のメールにフィルターを適用しました。",
        "move": "%{count} 件のメールを移動しました。",
        "set_seen": "%{count} 件のメールを既読にしました。",
        "set_star": "%{count} 件のメールにスターをつけました。",
        "unset_seen": "%{count} 件のメールを未読にしました。",
        "unset_star": "%{count} 件のメールからスターをはずしました。"
      },
      "no_recent_mail": "新着メールはありません。",
      "over_threshold": "メールボックスの容量が残り %{size} です。",
      "recent_mail": "%{count} 件の新着メールがあります。",
      "reloaded_mailboxes": "同期しました。",
      "requested_mdn": "メッセージ送信者は開封確認を要求しています。",
      "send_mdn": "開封確認メールを送信しました。"
    },
    "options": {
      "action": {
        "copy": "コピーする",
        "delete": "サーバから削除する",
        "move": "移動する",
        "request_dsn": "配信確認メッセージを要求する",
        "request_mdn": "開封確認メッセージを要求する",
        "trash": "削除する"
      },
      "conjunction": {
        "and": "すべての条件に一致",
        "or": "いずれかの条件に一致"
      },
      "filter_field": {
        "bcc": "BCC",
        "body": "本文",
        "cc": "CC",
        "from": "差出人",
        "subject": "件名",
        "to": "宛先"
      },
      "filter_operator": {
        "exclude": "に次を含まない",
        "include": "に次を含む"
      },
      "imap_ssl_use": {
        "disabled": "使用しない",
        "enabled": "使用する"
      }
    },
    "personal": "個人",
    "personal_config": "個人設定",
    "roles": {
      "admin": "管理者",
      "user": "一般ユーザー"
    },
    "search": {
      "columns": {
        "body": "本文",
        "from": "差出人",
        "subject": "件名",
        "text": "キーワード",
        "to": "宛先"
      }
    },
    "settings": {
      "account": "アカウント",
      "cache": "キャッシュ",
      "export_mails": "エクスポート",
      "import_mails": "インポート",
      "special_mailbox": "特別なフォルダー"
    },
    "signature": "署名",
    "system_config": "システム設定"
  },
  "webmail_role": {
    "edit_webmail_accounts": "アカウントの編集",
    "edit_webmail_group_imap_caches": "グループ代表メールのキャッシュの管理",
    "edit_webmail_group_imap_filters": "グループ代表メールのフィルターの管理",
    "edit_webmail_group_imap_mailboxes": "グループ代表メールのフォルダーの管理",
    "edit_webmail_group_imap_signatures": "グループ代表メールの署名の管理",
    "edit_webmail_groups": "グループの管理",
    "edit_webmail_roles": "権限/ロールの管理",
    "edit_webmail_users": "ユーザーの管理",
    "read_webmail_accounts": "アカウントの閲覧",
    "read_webmail_histories": "操作履歴の閲覧",
    "use_webmail_group_imap_setting": "グループ代表メールの使用"
  },
  "workflow": {
    "agent_name": "（代理: %{long_name}）",
    "agent_name_with_email": "（代理: %{long_name}(%{email})）",
    "branch_message": "このページは差し替えページです。",
    "branch_page": "差し替えページ",
    "buttons": {
      "approve": "承認",
      "cancel": "取消",
      "pull_up": "引き上げ承認",
      "remand": "差し戻し",
      "request": "申請",
      "restart": "再申請",
      "select": "選択"
    },
    "circulation_comment": "コメント",
    "circulation_state": {
      "pending": "下位承認待ち",
      "seen": "確認済",
      "unseen": "回覧中"
    },
    "circulation_step": "回覧",
    "cloned_name_prefix": "複製",
    "comment": "コメント",
    "confirm": {
      "request_cancel": "申請を取り消してもよろしいですか？",
      "set_seen": "既読にしてもよろしいですか？",
      "unset_seen": "未読にしてもよろしいですか？"
    },
    "create_branch": "差し替えページを作成する",
    "csv": {
      "approvers_or_circulations": "承認者・回覧者"
    },
    "empty_route_options": "承認経路が設定されていません。",
    "links": {
      "approver_file_upload": "ファイル追加",
      "set_seen": "確認済にする",
      "unset_seen": "回覧中に戻す"
    },
    "mail": {
      "subject": {
        "approve": "最終承認完了",
        "remand": "承認差し戻し",
        "request": "承認申請"
      }
    },
    "master_message": "以下の差し替えページが作成されています。",
    "master_page": "差し替え元ページ",
    "member": "ログインメンバー",
    "name": "ワークフロー",
    "notice": {
      "approver_file_droppable": "ファイル追加ボタンをクリックするか、ここにファイルをドロップしてください。",
      "created_branch_page": "差し替えページを作成しました。",
      "request_cancelled": "申請を取り消しました。"
    },
    "options": {
      "on_remand": {
        "back_to_init": "最初に戻る",
        "back_to_previous": "直前に戻る"
      },
      "posted_by": {
        "admin": "管理側投稿",
        "member": "マイページ投稿"
      },
      "required_count": {
        "all": "全員",
        "minimum": "%{required_count} 人"
      }
    },
    "page": {
      "approve": "依頼されたもの",
      "closed": "非公開",
      "ready": "公開待ち",
      "remand": "差し戻されたもの",
      "request": "申請したもの",
      "wait_close": "公開終了間近"
    },
    "pages": "承認",
    "request": "承認申請",
    "request_cancelled_message": "承認申請は申請者によってキャンセルされました。",
    "request_to": "申請先",
    "required_count_label": {
      "all": "全員の承認が必要",
      "minimum": "%{required_count} 人の承認が必要"
    },
    "restart_workflow": "再申請",
    "route": "承認経路",
    "search_approvers": {
      "index": "承認者を選択する",
      "search": "検索",
      "select": "承認者を設定する"
    },
    "search_circulations": {
      "index": "回覧者を選択する",
      "search": "検索",
      "select": "回覧者を設定する"
    },
    "selectable_users": "選択候補",
    "state": {
      "approve": "承認",
      "cancelled": "申請キャンセル",
      "other_approved": "他者承認済",
      "other_pulled_up": "引き上げ",
      "other_remanded": "他者差し戻し",
      "pending": "下位承認待ち",
      "remand": "差し戻し",
      "request": "申請中"
    },
    "user_deleted": "削除ユーザー"
  }
});
