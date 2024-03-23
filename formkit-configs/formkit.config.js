import { en, ar } from "@formkit/i18n";
import { rootClasses } from "../formkit.theme";
import { defineFormKitConfig } from "@formkit/vue";

export default defineFormKitConfig(() => {
  return {
    locales: { en, ar },
    locale: "en",
    config: { rootClasses }
  };
});
