import { computed as P, defineComponent as D, toRef as b, ref as w, resolveComponent as d, openBlock as i, createElementBlock as u, Fragment as v, createElementVNode as N, toDisplayString as m, renderList as I, createVNode as l, withCtx as n, createTextVNode as p, createBlock as B, createCommentVNode as L } from "vue";
import { IonModal as A, IonButton as Q, IonInput as T, IonContent as j, IonHeader as E, IonTitle as F, IonToolbar as H, IonItem as K, IonLabel as R } from "@ionic/vue";
const U = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-linejoin='round' d='M320 320L192 192M192 320l128-128' class='ionicon-fill-none ionicon-stroke-width'/></svg>";
function W(e, a, r = "modelValue") {
  return P({
    get: () => e[r],
    set: (t) => a(`update:${r}`, t)
  });
}
const q = (e, a) => {
  const r = e.__vccOpts || e;
  for (const [t, k] of a)
    r[t] = k;
  return r;
}, G = D({
  name: "IonSearchMultiSelect",
  components: {
    IonModal: A,
    IonButton: Q,
    IonInput: T,
    IonContent: j,
    IonHeader: E,
    IonTitle: F,
    IonToolbar: H,
    IonItem: K,
    IonLabel: R
  },
  props: {
    optionsProp: Array,
    modelValue: Array,
    fieldNameProp: String,
    spanProp: Boolean
  },
  setup(e, { emit: a }) {
    var o;
    const r = b(e, "optionsProp").value;
    let t = W(e, a, "modelValue");
    const k = b(e, "fieldNameProp").value, V = (o = b(e, "spanProp").value) != null ? o : !1;
    let c = w(!1), h = w(""), g = w(r);
    const M = () => {
      c.value = !1;
    }, f = () => {
      c.value = !0;
    }, C = (s, _) => _ ? s.filter((S) => S.toLowerCase().includes(_)) : s, O = () => {
      g.value = C(r, h.value);
    }, y = (s) => {
      let _ = 0, S = 0;
      for (; _ < t.value.length; ) {
        const z = t.value[_];
        z != s && (t.value[S++] = z), _++;
      }
      t.value.length = S;
    };
    return {
      searchQuery: h,
      filteredOptions: g,
      options: r,
      selectedOptions: t,
      fieldName: k,
      span: V,
      isOpen: c,
      openModal: f,
      closeModal: M,
      removeOption: y,
      toggleSelected: (s) => {
        t.value.includes(s) ? y(s) : t.value.push(s);
      },
      filterOptions: O,
      closeCircleOutline: U
    };
  }
}), J = { key: 0 }, X = { style: { "font-size": "1rem" } }, Y = { key: 1 }, Z = { key: 0 };
function x(e, a, r, t, k, V) {
  const c = d("ion-button"), h = d("ion-title"), g = d("ion-toolbar"), M = d("ion-header"), f = d("ion-item"), C = d("ion-label"), O = d("ion-input"), y = d("ion-content"), $ = d("ion-modal");
  return i(), u(v, null, [
    N("div", null, [
      e.span ? (i(), u("span", J, [
        N("h4", X, m(e.fieldName), 1),
        (i(!0), u(v, null, I(e.selectedOptions, (o) => (i(), u("span", {
          key: o,
          style: { position: "relative" }
        }, [
          l(c, {
            class: "multi-select-button",
            size: "small",
            onClick: (s) => e.removeOption(o)
          }, {
            default: n(() => [
              p(m(o), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])
        ]))), 128))
      ])) : (i(), u("div", Y, [
        N("h2", null, m(e.fieldName), 1),
        (i(!0), u(v, null, I(e.selectedOptions, (o) => (i(), u("div", {
          key: o,
          style: { position: "relative" }
        }, [
          l(c, {
            class: "multi-select-button",
            size: "small",
            onClick: (s) => e.removeOption(o)
          }, {
            default: n(() => [
              p(m(o), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])
        ]))), 128))
      ])),
      l(c, {
        color: "secondary",
        onClick: e.openModal,
        size: e.span ? "small" : ""
      }, {
        default: n(() => [
          p(" Add More ")
        ]),
        _: 1
      }, 8, ["onClick", "size"])
    ]),
    l($, {
      "is-open": e.isOpen,
      onDidDismiss: e.closeModal
    }, {
      default: n(() => [
        l(M, null, {
          default: n(() => [
            l(g, null, {
              default: n(() => [
                l(h, null, {
                  default: n(() => [
                    p(m(e.fieldName), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        l(y, null, {
          default: n(() => [
            l(f, null, {
              default: n(() => [
                e.selectedOptions ? (i(), u("span", Z, [
                  (i(!0), u(v, null, I(e.selectedOptions, (o) => (i(), B(c, {
                    size: "small",
                    onClick: (s) => e.toggleSelected(o),
                    key: o
                  }, {
                    default: n(() => [
                      p(m(o), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"]))), 128))
                ])) : L("", !0)
              ]),
              _: 1
            }),
            l(f, null, {
              default: n(() => [
                l(C, null, {
                  default: n(() => [
                    p(" Search ")
                  ]),
                  _: 1
                }),
                l(O, {
                  modelValue: e.searchQuery,
                  "onUpdate:modelValue": a[0] || (a[0] = (o) => e.searchQuery = o),
                  placeholder: "Search",
                  onKeyup: a[1] || (a[1] = (o) => e.filterOptions())
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            l(f, null, {
              default: n(() => [
                l(c, {
                  color: "secondary",
                  onClick: e.closeModal
                }, {
                  default: n(() => [
                    p("Submit")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            }),
            (i(!0), u(v, null, I(e.filteredOptions, (o) => (i(), B(f, {
              key: o,
              onClick: (s) => e.toggleSelected(o),
              color: e.selectedOptions.includes(o) ? "success" : ""
            }, {
              default: n(() => [
                l(C, null, {
                  default: n(() => [
                    p(m(o), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["onClick", "color"]))), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["is-open", "onDidDismiss"])
  ], 64);
}
const ne = /* @__PURE__ */ q(G, [["render", x]]);
export {
  ne as IonSearchMultiSelect
};
