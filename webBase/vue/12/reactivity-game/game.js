var blessed = require("blessed");
const {
  ref,
  effect
} = require("@vue/reactivity")
// Create a screen object.


// const val=ref(0);
// setInterval(()=>{
//   val.value++;
// },100);
// effect(()=>{
//   box.setContent(`${val.value}%`)
//   screen.render();
// })


const App = {
  render(content) {
    effect(() => {
      if(screen){
        screen.destroy();
      }
      var screen = blessed.screen({
        smartCSR: true,
      });
      var box = blessed.box({
        top: "center",
        left: `${content.left.value}%`,
        width: "50%",
        height: "50%",
        content: `left ${content.left.value}%`,
        tags: true,
        border: {
          type: "line",
        },
        style: {
          fg: "white",
          bg: "magenta",
          border: {
            fg: "#f0f0f0",
          },
        },
      });

      box.on("click",content.handleClick)

      screen.append(box);

      screen.key(["escape", "q", "C-c"], function (ch, key) {
        return process.exit(0);
      });
      screen.render();
    })
  },
  setup(props) {
    const left = ref(0);
    setInterval(() => {
      left.value++;
    }, 200);
    function handleClick(){
      left.value=1;
    }
    return {
      left,handleClick
    }
  }
}

App.render(App.setup())