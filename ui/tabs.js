
// tabs.js

function onFirstLoad(build_spec) {
      let data = build_spec;
      const xProperties = ["x-enum", "x-tags", "x-examples", "x-flows", "x-attributes", "x-errorcodes", "x-tlc"];
      xProperties.forEach((xProperty) => {
        if (data[xProperty]) {
          switch (xProperty) {
            case "x-enum":
              initSchema(data[xProperty]);
              break;
            case "x-tags":
              initTag(data[xProperty]);
              break;
            case "x-examples":
              loadExample(data[xProperty]);
              break;
            case "x-flows":
              loadFlows(data[xProperty]);
              break;
            case "x-attributes":
              loadAttributes(data[xProperty]);
              break;
            case "x-errorcodes":
              loadErrors(data[xProperty]);
              break;
            case "x-tlc":
              loadTlc(data[xProperty]);
              break;
            default:
              break; 
          }
        } else {
          console.log(`${xProperty} is not present in the build_spec.`);
        }
      });
    }
    

// window.onload = function(){
//       onFirstLoad(build_spec)
// } 