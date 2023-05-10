panel.plugin('junohamburg/block-preview-fields', {
  created(Vue) {
    const unsubscribe = Vue.$store.subscribeAction(async (action, state) => {
      // Fetch options once, but only if user is logged in
      if (Vue.$user === undefined || Vue.$user === null) return;

      unsubscribe();

      // Create custom store
      Vue.$store.registerModule('blockPreviewFields', {
        state: () => ({
          options: {}
        }),
        mutations: {
          updateOptions(state, options) {
            state.options = options;
          }
        },
        actions: {
          updateOptions({ commit }, { options }) {
            commit('updateOptions', options);
          }
        }
      });

      // Fetch options
      const options = await Vue.$api.get('block-preview-fields');

      // Update store
      Vue.$store.dispatch({
        type: 'updateOptions',
        options: options
      });
    });
  },
  blocks: {
    fields: {
      data() {
        return {
          currentTab: Object.values(this.fieldset.tabs)[0].name,
          isHidden: JSON.parse(
            sessionStorage.getItem(
              `kirby.blockPreviewFields.${this.$attrs.endpoints.field}.${this.$attrs.id}`
            )
          )
        };
      },
      computed: {
        options() {
          return this.$store.state.blockPreviewFields.options;
        },
        showTabs() {
          return Object.values(this.fieldset.tabs).length > 1;
        },
        toggleIcon() {
          return this.isHidden ? 'angle-down' : 'angle-up';
        },
        // https://github.com/getkirby/kirby/blob/main/panel/src/components/Forms/Blocks/BlockTitle.vue
        icon() {
          return this.fieldset.icon || 'box';
        },
        label() {
          if (!this.fieldset.label || this.fieldset.label.length === 0) {
            return false;
          }

          if (this.fieldset.label === this.fieldset.name) {
            return false;
          }

          const label = this.$helper.string.template(
            this.fieldset.label,
            this.content
          );

          return label === '…' ? false : this.$helper.string.stripHTML(label);
        }
      },
      methods: {
        toggle() {
          this.isHidden = !this.isHidden;
          sessionStorage.setItem(
            `kirby.blockPreviewFields.${this.$attrs.endpoints.field}.${this.$attrs.id}`,
            this.isHidden
          );
        }
      },
      template: `
        <div
          class="k-block-preview-fields"
          :class="isHidden && 'k-block-preview-fields-hidden'"
        >
          <div class="k-block-title" v-on="$listeners">
            <k-icon :type="icon" v-if="options.icon" />

            <span class="k-block-name">
              {{ fieldset.name }}
            </span>
            <span v-if="label" class="k-block-label">
              {{ label }}
            </span>

            <nav class="k-drawer-tabs" v-if="!isHidden">
              <k-button
                v-if="showTabs"
                v-for="tab in fieldset.tabs"
                :key="tab.name"
                :text="tab.label"
                :current="currentTab == tab.name"
                @click="currentTab = tab.name"
                class="k-drawer-tab"
              />
            </nav>

            <k-button
              :icon="toggleIcon"
              :current="false"
              @click="toggle"
              class="k-block-preview-fields-toggle"
            />
          </div>

          <div
            class="k-block-preview-fields-fieldset-wrapper"
            :class="{ 'equal-height': options.equalHeightTabs }"
            v-if="!isHidden"
          >
            <k-fieldset
              v-for="tab in fieldset.tabs"
              :key="tab.name"
              :fields="tab.fields"
              :value="$helper.clone(content)"
              @input="$emit('update', $event)"
              :class="currentTab != tab.name && 'hidden'"
            />
          </div>
        </div>
      `
    }
  }
});
