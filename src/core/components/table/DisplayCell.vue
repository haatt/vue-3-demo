<script lang="ts">
import { defineComponent, h } from "vue";
import type { DefineComponent, VNodeProps } from "vue";

/**
 * DisplayCell component
 */
export default defineComponent({
  name: "DisplayCell",
  props: {
    component: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    let slot: () => unknown[];

    if (props.component[2]) {
      slot = () => {
        const children = [];
        children.push(props.component[2]);
        return children;
      };
    }

    return () => h(props.component[0] as DefineComponent, props.component[1] as VNodeProps, slot);
  },
});
</script>
