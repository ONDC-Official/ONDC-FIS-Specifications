# API Contract

The API Contract document is part of the repository as a static index.html. Once the repo is checked out any user can go ahead and open this index.html into their repo and visualise the information of the repo in a Visual API contract format. Alternate to this user can also look into github pages here to visualise the current master specification.

# Repository Structure

**Note:** All folders mentioned here are relative to the root folder `protocol-specs`

The full specification can be found at `api/build/build.yaml`

This is an autogenerated file created by compiling multiple sets of components namely,

1. Enum: found at `api/components/enum/`
   * These are all the enums used in specification while creating the artifact
2. Tags: found at `api/components/tags/`
   * These are all the tags/taggroups used in specification while creating the artifact
3. Examples: found at `api/components/examples/`
   * These are the examples created Illustrative use of the specification and embeeded in the yaml
   * Structure `api/components/examples/{module/feature/use case}/{API_Folder}/example_{#}.yaml`
4. Unresolved YAML: found at `api/components/beck_yaml.yaml`

## Diagaram

```

/ (root directory)
|
|--beckn-core (git submodule to specific beckn inheritated release)
|--api (contains all the api specific details)
|  |--build
|  |  |--build.yaml (Built Single YAML with api specification)
|  |--components (contains all components of the specification)
|  |  |--enum (contains all enums used in module)
|  |  |  |--index.yaml (index yaml) 
|  |  |  |--{schema}.yaml (dictionary yaml)
|  |  |--examples (conatins examples of the APIs)
|  |  |  |--(theme/usecase/base/behaviour)
|  |  |  |  |--search (search request examples yaml)
|  |  |  |  |  |--example_0.yaml (example_0 yaml)
|  |  |--tags (contains Tags all tags used in module)
|  |  |  |--tag-group.yaml (Tag Group Yaml)
|  |  |  |--tag.yaml (tag yaml) 
|  |  |  |--index.yaml (tag index yaml)
|  |  |--flows (contains illustrative flows module)
|  |  |  |--(theme/usecase/base/behaviour)
|  |  |  |  |--index.yaml (specific flow yaml) 
|  |  |  |--index.yaml (flows index yaml)  
|  |  |--beck_yaml.yaml (unresolved yaml to build final yaml)
|  |  |--docs (documents associated with specification)
|  |  |  |--attribute.md (Attribute to business terminology mapping)description)
```

# Setup steps

## Pre-requisite

### Install swagger CLI

- Install the swagger command line tool using ``npm`` (Note: you may need to use root privileges if installing it globally)

```
sudo npm install -g swagger-cli
```

## Generate the resolved OpenAPI illustration viewer file

- Run the following command

```
cd ./api/components
node app
```

- If the command runs successfully, you should see an output like this,

```
Created temp.yaml from ./beckn_yaml.yaml
Temporary file deleted
```