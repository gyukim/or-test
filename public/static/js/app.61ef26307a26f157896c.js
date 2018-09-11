webpackJsonp(
  [1],
  {
    "3SYt": function(t, e) {
      t.exports =
        "#define SHADER_NAME quad.frag\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vPosition;\n\nuniform vec3 uSunPos;\n\n#define PI 3.141592\n#define iSteps 16\n#define jSteps 8\n\nvec2 rsi_1_0(vec3 r0, vec3 rd, float sr) {\n    // ray-sphere intersection that assumes\n    // the sphere is centered at the origin.\n    // No intersection when result.x > result.y\n    float a = dot(rd, rd);\n    float b = 2.0 * dot(rd, r0);\n    float c = dot(r0, r0) - (sr * sr);\n    float d = (b*b) - 4.0*a*c;\n    if (d < 0.0) return vec2(1e5,-1e5);\n    return vec2(\n        (-b - sqrt(d))/(2.0*a),\n        (-b + sqrt(d))/(2.0*a)\n    );\n}\n\nvec3 atmosphere_1_1(vec3 r, vec3 r0, vec3 pSun, float iSun, float rPlanet, float rAtmos, vec3 kRlh, float kMie, float shRlh, float shMie, float g) {\n    // Normalize the sun and view directions.\n    pSun = normalize(pSun);\n    r = normalize(r);\n\n    // Calculate the step size of the primary ray.\n    vec2 p = rsi_1_0(r0, r, rAtmos);\n    if (p.x > p.y) return vec3(0,0,0);\n    p.y = min(p.y, rsi_1_0(r0, r, rPlanet).x);\n    float iStepSize = (p.y - p.x) / float(iSteps);\n\n    // Initialize the primary ray time.\n    float iTime = 0.0;\n\n    // Initialize accumulators for Rayleigh and Mie scattering.\n    vec3 totalRlh = vec3(0,0,0);\n    vec3 totalMie = vec3(0,0,0);\n\n    // Initialize optical depth accumulators for the primary ray.\n    float iOdRlh = 0.0;\n    float iOdMie = 0.0;\n\n    // Calculate the Rayleigh and Mie phases.\n    float mu = dot(r, pSun);\n    float mumu = mu * mu;\n    float gg = g * g;\n    float pRlh = 3.0 / (16.0 * PI) * (1.0 + mumu);\n    float pMie = 3.0 / (8.0 * PI) * ((1.0 - gg) * (mumu + 1.0)) / (pow(1.0 + gg - 2.0 * mu * g, 1.5) * (2.0 + gg));\n\n    // Sample the primary ray.\n    for (int i = 0; i < iSteps; i++) {\n\n        // Calculate the primary ray sample position.\n        vec3 iPos = r0 + r * (iTime + iStepSize * 0.5);\n\n        // Calculate the height of the sample.\n        float iHeight = length(iPos) - rPlanet;\n\n        // Calculate the optical depth of the Rayleigh and Mie scattering for this step.\n        float odStepRlh = exp(-iHeight / shRlh) * iStepSize;\n        float odStepMie = exp(-iHeight / shMie) * iStepSize;\n\n        // Accumulate optical depth.\n        iOdRlh += odStepRlh;\n        iOdMie += odStepMie;\n\n        // Calculate the step size of the secondary ray.\n        float jStepSize = rsi_1_0(iPos, pSun, rAtmos).y / float(jSteps);\n\n        // Initialize the secondary ray time.\n        float jTime = 0.0;\n\n        // Initialize optical depth accumulators for the secondary ray.\n        float jOdRlh = 0.0;\n        float jOdMie = 0.0;\n\n        // Sample the secondary ray.\n        for (int j = 0; j < jSteps; j++) {\n\n            // Calculate the secondary ray sample position.\n            vec3 jPos = iPos + pSun * (jTime + jStepSize * 0.5);\n\n            // Calculate the height of the sample.\n            float jHeight = length(jPos) - rPlanet;\n\n            // Accumulate the optical depth.\n            jOdRlh += exp(-jHeight / shRlh) * jStepSize;\n            jOdMie += exp(-jHeight / shMie) * jStepSize;\n\n            // Increment the secondary ray time.\n            jTime += jStepSize;\n        }\n\n        // Calculate attenuation.\n        vec3 attn = exp(-(kMie * (iOdMie + jOdMie) + kRlh * (iOdRlh + jOdRlh)));\n\n        // Accumulate scattering.\n        totalRlh += odStepRlh * attn;\n        totalMie += odStepMie * attn;\n\n        // Increment the primary ray time.\n        iTime += iStepSize;\n\n    }\n\n    // Calculate and return the final color.\n    return iSun * (pRlh * kRlh * totalRlh + pMie * kMie * totalMie);\n}\n\n\n\n\nvoid main() {\n    vec3 color = atmosphere_1_1(\n        normalize(vPosition),           // normalized ray direction\n        vec3(0,6372e3,0),               // ray origin\n        uSunPos,                        // position of the sun\n        22.0,                           // intensity of the sun\n        6371e3,                         // radius of the planet in meters\n        6471e3,                         // radius of the atmosphere in meters\n        vec3(5.5e-6, 13.0e-6, 22.4e-6), // Rayleigh scattering coefficient\n        21e-6,                          // Mie scattering coefficient\n        8e3,                            // Rayleigh scale height\n        1.2e3,                          // Mie scale height\n        0.758                           // Mie preferred scattering direction\n    );\n\n    // Apply exposure.\n    color = 1.0 - exp(-1.0 * color);\n\n    gl_FragColor = vec4(color, 1);\n}";
    },
    "5axL": function(t, e) {},
    "6A3X": function(t, e) {},
    "9E6J": function(t, e) {},
    "9ofH": function(t, e) {},
    B8Nw: function(t, e) {},
    FXpa: function(t, e) {},
    HAwQ: function(t, e) {},
    NHnr: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = n("7+uW"),
        i = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { attrs: { id: "app" } }, [e("router-view")], 1);
          },
          staticRenderFns: []
        };
      var a = n("VU/8")(
          { name: "App" },
          i,
          !1,
          function(t) {
            n("OYGR");
          },
          null,
          null
        ).exports,
        r = n("/ocq"),
        l = {
          data: function() {
            return {
              nowConnectDis: "",
              please: ["Enter to ", " by your ", " and control the screen."],
              url: "orgd-list.kr "
            };
          },
          mounted: function() {
            this.secondLineAnimate();
          },
          methods: {
            secondLineAnimate: function() {
              var t = TweenMax.to("#secondLine", 1, {
                ease: Linear.easeNone,
                css: { left: "-130%" },
                repeat: -1
              });
              t.duration();
              t.duration(18);
            }
          }
        },
        c = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { attrs: { id: "distort" } }, [
              n(
                "div",
                { staticClass: "textWraper", attrs: { id: "secondLine" } },
                [
                  n("span", {
                    attrs: { id: "please" },
                    domProps: { textContent: t._s(t.please[0]) }
                  }),
                  t._v(" "),
                  n("span", {
                    attrs: { id: "urls" },
                    domProps: { textContent: t._s(t.url) }
                  }),
                  t._v(" "),
                  n("span", {
                    attrs: { id: "please" },
                    domProps: { textContent: t._s(t.please[1]) }
                  }),
                  t._v(" "),
                  n("span", { attrs: { id: "smartPhone" } }, [
                    t._v("Smartphone ")
                  ]),
                  t._v(" "),
                  n("span", {
                    attrs: { id: "please" },
                    domProps: { textContent: t._s(t.please[2]) }
                  }),
                  t._v(" "),
                  n("span", {
                    attrs: { id: "please" },
                    domProps: { textContent: t._s(t.nowConnectDis) }
                  })
                ]
              )
            ]);
          },
          staticRenderFns: []
        };
      var s = n("VU/8")(
          l,
          c,
          !1,
          function(t) {
            n("zy6Z");
          },
          null,
          null
        ).exports,
        u = {
          components: { slideText: s },
          data: function() {
            return { subject: "List of Graphic Design Student Works Viewer" };
          },
          methods: {}
        },
        m = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "div",
              { attrs: { id: "display-top" } },
              [
                e("slideText"),
                this._v(" "),
                e(
                  "div",
                  { staticClass: "textWraper", attrs: { id: "firstLine" } },
                  [
                    e("span", {
                      domProps: { textContent: this._s(this.subject) }
                    })
                  ]
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var B = n("VU/8")(
          u,
          m,
          !1,
          function(t) {
            n("HAwQ");
          },
          null,
          null
        ).exports,
        D = new o.a(),
        d = {
          data: function() {
            return {
              textDisplay: "0",
              subject: ["1", "2", "3", "4"],
              imageNums: 1
            };
          },
          created: function() {
            D.$on("imageNumSend", this.onReceive);
          },
          methods: {
            onReceive: function(t) {
              this.imageNums = t;
            }
          }
        },
        F = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { attrs: { id: "display-bot" } }, [
              e("div", { attrs: { id: "textDisplayContainer" } }, [
                e("span", {
                  domProps: { textContent: this._s(this.imageNums) }
                })
              ])
            ]);
          },
          staticRenderFns: []
        };
      var h,
        p = n("VU/8")(
          d,
          F,
          !1,
          function(t) {
            n("h5C8");
          },
          null,
          null
        ).exports,
        E = n("pXIW"),
        A = 90,
        f = { x: 16.4 },
        g = 0,
        v = [
          12,
          13,
          16,
          38,
          39,
          43,
          46,
          64,
          66,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          82,
          85,
          97,
          98,
          130,
          131,
          142,
          144,
          145,
          146,
          148,
          149,
          153,
          154,
          157,
          158,
          159,
          160,
          162,
          165,
          179,
          208,
          209,
          210,
          211,
          212
        ],
        C = [
          20,
          28,
          50,
          51,
          52,
          60,
          65,
          67,
          72,
          79,
          80,
          90,
          95,
          99,
          100,
          137,
          138,
          139,
          151,
          172,
          175,
          176,
          178,
          187,
          188,
          189,
          190,
          191,
          192,
          193,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          207
        ],
        w = {
          name: "DisplayMain",
          components: { displayTop: B, displayBot: p },
          data: function() {
            return {
              imageSrc: "/static/images/1_1.jpg",
              backimageId: "backImage",
              imageBright: 1,
              imageNum: 1
            };
          },
          sockets: {
            connect: function() {
              console.log("sockdddddet connected");
            },
            displayControl: function(t) {
              console.log(t), this.routerChange(t);
            },
            connectCountDeliv: function(t) {
              console.log(t),
                (g = t) > 1 ? this.thetaUp(20.2) : this.thetaUp(16.4);
            }
          },
          created: function() {},
          mounted: function() {
            (A = 90),
              this.changeImage(),
              this.drawBackground(),
              g > 1 && this.thetaUp(17);
          },
          beforeDestroy: function() {
            for (var t = 1; t < 99990; t++) window.clearInterval(t);
            cancelAnimationFrame(h);
          },
          methods: {
            drawBackground: function() {
              var t = n("pcrw"),
                e = n("pyS4"),
                o = (n("pb35"), document.getElementById("canvas"));
              (o.width = 1920), (o.height = 1200);
              var i = o.getContext("webgl"),
                a = e(i).attr("aPosition", [
                  -1,
                  -1,
                  -1,
                  1,
                  -1,
                  -1,
                  1,
                  1,
                  -1,
                  -1,
                  -1,
                  -1,
                  1,
                  1,
                  -1,
                  -1,
                  1,
                  -1
                ]),
                r = n("3SYt"),
                l = t(i, n("X6+0"), r);
              !(function t() {
                l.bind(),
                  a.bind(l),
                  (l.uniforms.uSunPos = [0, 0.3 * Math.cos(f.x) + 0.2, -1]),
                  a.draw(),
                  (h = requestAnimationFrame(t));
              })();
            },
            changeImage: function() {
              var t = this;
              setTimeout("location.reload()", 6e6),
                setInterval(function() {
                  t.$socket.emit("colorChange", t.imageNum),
                    D.$emit("imageNumSend", t.imageNum),
                    t.imageNum < 212
                      ? (t.imageNum++,
                        -1 != C.indexOf(t.imageNum) && t.imageNum++)
                      : (t.imageNum = 1),
                    -1 == v.indexOf(t.imageNum)
                      ? (t.imageSrc = "/static/images/" + t.imageNum + "_1.jpg")
                      : (t.imageSrc =
                          "/static/images/" + t.imageNum + "_1.png"),
                    D.$emit("imageNumSend", t.imageNum);
                }, 3e3),
                setInterval(function() {
                  0.01,
                    (A += 0.6 * 3),
                    (document.getElementById("backImage").style.transform =
                      " perspective(250px) rotateX(0deg) rotateY(" +
                      A +
                      "deg)");
                }, 30);
            },
            routerChange: function(t) {
              this.$router.push(t);
            },
            thetaUp: function(t) {
              var e = void 0;
              new E.Tween(f)
                .to({ x: t }, 15e3)
                .onComplete(function() {
                  cancelAnimationFrame(e);
                })
                .start();
              console.log(f.x),
                (e = requestAnimationFrame(function t(n) {
                  E.update(n), (e = requestAnimationFrame(t));
                }));
            }
          }
        },
        y = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("transition", { attrs: { name: "fade" } }, [
              n(
                "div",
                { attrs: { id: "dislpayBody" } },
                [
                  n("canvas", { attrs: { id: "canvas" } }),
                  t._v(" "),
                  n(
                    "div",
                    {
                      staticClass: "clipping",
                      style: { fiter: "brightness(1)" },
                      attrs: { id: t.backimageId },
                      on: {
                        click: function(e) {
                          t.changeImage();
                        }
                      }
                    },
                    [
                      n("div", { attrs: { id: "backImageWrapper" } }, [
                        n("img", { attrs: { src: t.imageSrc } })
                      ])
                    ]
                  ),
                  t._v(" "),
                  n("displayTop"),
                  t._v(" "),
                  n("displayBot")
                ],
                1
              )
            ]);
          },
          staticRenderFns: []
        };
      var _ = n("VU/8")(
          w,
          y,
          !1,
          function(t) {
            n("Utvk");
          },
          "data-v-5da41639",
          null
        ).exports,
        x = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { attrs: { id: "leftTopContainer" } }, [
              e("div", { attrs: { id: "leftTop" } }, [
                e("h1", { domProps: { textContent: this._s(this.listText) } })
              ]),
              this._v(" "),
              e("div", { attrs: { id: "leftTopDummy" } })
            ]);
          },
          staticRenderFns: []
        };
      var S = n("VU/8")(
          {
            data: function() {
              return {
                listText: "List of Graphic Design Student Works - Controller"
              };
            }
          },
          x,
          !1,
          function(t) {
            n("9ofH");
          },
          "data-v-d1bc8cb8",
          null
        ).exports,
        b = n("bOdI"),
        k = n.n(b),
        I = n("xhSa"),
        N = k()(
          {
            sockets: {
              connectCountDeliv: function(t) {
                console.log(t), (this.connectNum = t - 1);
              },
              colorChangeAct: function(t) {
                (this.gradientNum = t),
                  this.colorChangeAnimation(this.gradientNum);
              }
            },
            data: function() {
              return { gradientNum: 0 };
            },
            methods: {
              listpleaseAnimation: function() {
                var t = TweenMax.to("#list-please", 1, {
                  ease: Linear.easeNone,
                  css: { left: "-400%" },
                  repeat: -1
                });
                t.duration();
                t.duration(15);
              },
              emitEvent: function(t) {
                this.$socket.emit("controlAction", t), console.log("clicked");
              },
              colorChangeAnimation: function(t) {
                for (var e = 0; e < I.length; e++) {
                  var n;
                  I[e].num == t && (n = I[e].color);
                }
                console.log(n),
                  TweenMax.to("#button-container", 1, {
                    backgroundImage:
                      "linear-gradient(to top," +
                      n[0] +
                      "," +
                      n[1] +
                      "," +
                      n[2] +
                      ")",
                    repeat: 0
                  });
              }
            },
            mounted: function() {
              this.listpleaseAnimation();
            }
          },
          "data",
          function() {
            return { connectNum: 0 };
          }
        ),
        M = {
          render: function() {
            var t = this,
              e = t.$createElement,
              o = t._self._c || e;
            return o("div", { attrs: { id: "menu" } }, [
              o("div", { attrs: { id: "list-please-container" } }, [
                o("p", { attrs: { id: "list-please" } }, [
                  t._v("\nConcurrent Users " + t._s(t.connectNum) + "\n")
                ])
              ]),
              t._v(" "),
              o("div", { attrs: { id: "button-container" } }, [
                t._m(0),
                t._v(" "),
                o(
                  "div",
                  { attrs: { id: "button-second" } },
                  [
                    o("router-link", { attrs: { to: "/controllist" } }, [
                      o("img", {
                        attrs: { id: "list-link", src: n("mZpV") },
                        on: {
                          click: function(e) {
                            t.emitEvent("displaylist");
                          }
                        }
                      })
                    ])
                  ],
                  1
                )
              ])
            ]);
          },
          staticRenderFns: [
            function() {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", { attrs: { id: "button-first" } }, [
                e("p", { attrs: { id: "connectCap" } }, [
                  this._v(" \n    Screen connection is complete! "),
                  e("br"),
                  this._v(
                    "This website contains only a portion of the entire list.\n  "
                  )
                ])
              ]);
            }
          ]
        };
      var R = n("VU/8")(
          N,
          M,
          !1,
          function(t) {
            n("YNkF");
          },
          "data-v-3b90aa11",
          null
        ).exports,
        j = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { staticClass: "container" }, [
              n("div", { staticClass: "input-group col-md-3" }, [
                n("span", { staticClass: "input-group-addon" }, [
                  t._v("\n            PW\n        ")
                ]),
                t._v(" "),
                n("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.del_password,
                      expression: "del_password"
                    }
                  ],
                  staticClass: "form-control col-md-2",
                  attrs: { type: "text" },
                  domProps: { value: t.del_password },
                  on: {
                    input: function(e) {
                      e.target.composing || (t.del_password = e.target.value);
                    }
                  }
                })
              ]),
              t._v(" "),
              n("div", { staticClass: "row col-md-6" }, [
                n("input", {
                  staticClass: "btn btn-default col-md-3",
                  attrs: { type: "button", value: "삭제" },
                  on: { click: t.del_data }
                }),
                t._v(" "),
                n("input", {
                  staticClass: "btn btn-default col-md-3",
                  attrs: { type: "button", value: "취소" },
                  on: {
                    click: function(e) {
                      t.$emit("close");
                    }
                  }
                })
              ])
            ]);
          },
          staticRenderFns: []
        },
        L = n("VU/8")(
          {
            data: function() {
              return { del_password: "" };
            },
            props: ["hot_table"],
            methods: {
              del_data: function() {
                this.$emit("close");
              }
            }
          },
          j,
          !1,
          null,
          null,
          null
        ).exports,
        P = n("xhSa"),
        T = {
          name: "ControlList",
          components: { leftTop: S, menuList: R },
          sockets: {
            connect: function() {
              console.log("socket connected");
            },
            otherConnect: function(t) {
              console.log(t);
            }
          },
          methods: {
            changeBackground: function(t) {},
            setIntervalback: function() {},
            doc_del_rendar: function() {
              this.$modal.show(
                L,
                { hot_table: "data", modal: this.$modal },
                {
                  name: "dynamic-modal",
                  width: "200px",
                  height: "300px",
                  draggable: !0
                }
              );
            },
            emitEvent: function(t) {
              var e = t.currentTarget.id;
              console.log(e),
                this.$socket.emit("controlAction", "displaypage"),
                this.$socket.emit("pageNum", e);
            }
          },
          data: function() {
            return { titles: "ssssssssssssssssssssssssssssssss" };
          },
          mounted: function() {
            var t = this;
            (this.titles = P),
              this.changeBackground(0),
              setInterval(function() {
                t.setIntervalback(), t.changeBackground(0);
              }, 1);
          }
        },
        z = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              { attrs: { id: "contro-list-container" } },
              [
                n("modals-container"),
                t._v(" "),
                n("leftTop"),
                t._v(" "),
                n(
                  "div",
                  { attrs: { id: "control-list-span-cont" } },
                  [
                    n(
                      "router-link",
                      { attrs: { to: "/controlPage" } },
                      t._l(t.titles, function(e) {
                        return n(
                          "p",
                          {
                            attrs: { id: e.num },
                            on: {
                              click: function(e) {
                                t.emitEvent(e);
                              }
                            }
                          },
                          [t._v("\n         " + t._s(e.title) + "\n       ")]
                        );
                      })
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var U = n("VU/8")(
          T,
          z,
          !1,
          function(t) {
            n("ubwJ");
          },
          "data-v-7c8fe504",
          null
        ).exports,
        O = {
          components: { leftTop: S, menuList: R },
          sockets: {
            connect: function() {
              console.log("socket connected");
            },
            otherConnect: function(t) {
              console.log(t);
            }
          },
          methods: {
            changeBackground: function(t) {},
            setIntervalback: function() {},
            doc_del_rendar: function() {
              this.$modal.show(
                L,
                { hot_table: "data", modal: this.$modal },
                {
                  name: "dynamic-modal",
                  width: "200px",
                  height: "300px",
                  draggable: !0
                }
              );
            }
          },
          data: function() {
            return {};
          },
          mounted: function() {
            var t = this;
            this.changeBackground(0),
              setInterval(function() {
                t.setIntervalback(), t.changeBackground(0);
              }, 1);
          }
        },
        V = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("transition", { attrs: { name: "fade" } }, [
              e(
                "div",
                { attrs: { id: "mainCon" } },
                [
                  e("modals-container"),
                  this._v(" "),
                  e("leftTop"),
                  this._v(" "),
                  e("menuList")
                ],
                1
              )
            ]);
          },
          staticRenderFns: []
        };
      var H = n("VU/8")(
          O,
          V,
          !1,
          function(t) {
            n("jLwf");
          },
          "data-v-5198a596",
          null
        ).exports,
        W = 90,
        Y = (n("xhSa"),
        {
          sockets: {
            startPageReceive: function(t) {
              console.log(t),
                console.log(this.pngNum.indexOf(t)),
                -1 == this.pngNum.indexOf(t)
                  ? (this.imageSrc = "/static/images/" + t + "_1.jpg")
                  : (this.imageSrc = "/static/images/" + t + "_1.png");
            }
          },
          methods: {
            listpleaseAnimation: function() {
              var t = TweenMax.to("#list-please", 1, {
                ease: Linear.easeNone,
                css: { left: "-150%" },
                repeat: -1
              });
              t.duration();
              t.duration(12);
            },
            emitEvent: function(t) {
              this.$socket.emit("controlAction", t),
                window.location.reload(!0),
                console.log("clicked");
            },
            startEvent: function() {
              this.$socket.emit("startPage");
            },
            rotateImage: function() {
              setInterval(function() {
                0.01,
                  (W += 0.6 * 3),
                  (document.getElementById("backImage").style.transform =
                    " perspective(500px) rotateX(0deg) rotateY(" + W + "deg)");
              }, 30);
            }
          },
          mounted: function() {
            this.listpleaseAnimation(), this.rotateImage();
          },
          data: function() {
            return {
              imageSrc: "",
              backimageId: "backImage",
              imageNum: 1,
              pngNum: [
                "12",
                "13",
                "16",
                "38",
                "39",
                "43",
                "46",
                "64",
                "66",
                "68",
                "69",
                "74",
                "75",
                "76",
                "77",
                "78",
                "82",
                "85",
                "97",
                "98",
                "130",
                "131",
                "142",
                "144",
                "145",
                "146",
                "148",
                "149",
                "153",
                "154",
                "157",
                "158",
                "159",
                "160",
                "162",
                "165",
                "179",
                "208",
                "209",
                "210",
                "211",
                "212"
              ]
            };
          },
          beforeDestroy: function() {
            for (var t = 1; t < 99990; t++) window.clearInterval(t);
          }
        }),
        G = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { attrs: { id: "menu" } }, [
              t._m(0),
              t._v(" "),
              n("div", { attrs: { id: "button-container" } }, [
                n(
                  "div",
                  {
                    attrs: { id: "button-first" },
                    on: {
                      click: function(e) {
                        t.startEvent();
                      }
                    }
                  },
                  [
                    n(
                      "div",
                      { staticClass: "clipping", attrs: { id: t.backimageId } },
                      [
                        n("div", { attrs: { id: "backImageWrapper" } }, [
                          n("img", { attrs: { src: t.imageSrc } })
                        ])
                      ]
                    )
                  ]
                ),
                t._v(" "),
                n(
                  "div",
                  { attrs: { id: "button-page-third" } },
                  [
                    n("router-link", { attrs: { to: "/" } }, [
                      n(
                        "p",
                        {
                          attrs: { id: "list-link" },
                          on: {
                            click: function(e) {
                              t.emitEvent("displaymain");
                            }
                          }
                        },
                        [t._v("Exit")]
                      )
                    ])
                  ],
                  1
                )
              ])
            ]);
          },
          staticRenderFns: [
            function() {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", { attrs: { id: "list-please-container" } }, [
                e("p", { attrs: { id: "list-please" } }, [
                  this._v("\nPlease touch square")
                ])
              ]);
            }
          ]
        };
      var X = {
          components: {
            leftTop: S,
            pageButton: n("VU/8")(
              Y,
              G,
              !1,
              function(t) {
                n("FXpa");
              },
              "data-v-724cb983",
              null
            ).exports
          },
          sockets: {
            connect: function() {
              console.log("socket connected");
            },
            otherConnect: function(t) {
              console.log(t);
            },
            pageNumRe: function(t) {
              t;
            }
          },
          methods: {
            setIntervalback: function() {},
            doc_del_rendar: function() {
              this.$modal.show(
                L,
                { hot_table: "data", modal: this.$modal },
                {
                  name: "dynamic-modal",
                  width: "200px",
                  height: "300px",
                  draggable: !0
                }
              );
            }
          },
          data: function() {
            return {};
          },
          mounted: function() {}
        },
        q = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "div",
              { attrs: { id: "mainCon" } },
              [
                e("modals-container"),
                this._v(" "),
                e("leftTop"),
                this._v(" "),
                e("pageButton")
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var Z = n("VU/8")(
          X,
          q,
          !1,
          function(t) {
            n("B8Nw");
          },
          "data-v-565f5e4a",
          null
        ).exports,
        J = n("xhSa"),
        Q = {
          components: { slideText: s },
          sockets: {
            connect: function() {
              console.log("sockdddddet connected");
            },
            displayControl: function(t) {
              console.log(t), this.routerChange(t);
            },
            connectCountDeliv: function(t) {}
          },
          data: function() {
            return { titles: "ssssssssssssssssssssssssssssssss" };
          },
          mounted: function() {
            for (var t = 1; t < 99990; t++) window.clearInterval(t);
            (this.titles = J), this.displayListAnimation();
          },
          methods: {
            routerChange: function(t) {
              this.$router.push(t);
            },
            displayListAnimation: function() {
              var t = TweenMax.to("#display-list-span-cont", 1, {
                ease: Linear.easeNone,
                css: { top: "-200%" },
                repeat: -1
              });
              t.duration();
              t.duration(50);
            }
          }
        },
        K = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { attrs: { id: "display-list-container" } }, [
              n(
                "div",
                { attrs: { id: "display-list-top" } },
                [n("slideText")],
                1
              ),
              t._v(" "),
              n("div", { attrs: { id: "display-list-bot" } }, [
                n(
                  "div",
                  { attrs: { id: "display-list-span-cont" } },
                  t._l(t.titles, function(e) {
                    return n("span", [
                      t._v("\n           " + t._s(e.title) + "\n         ")
                    ]);
                  })
                )
              ])
            ]);
          },
          staticRenderFns: []
        };
      var tt = n("VU/8")(
          Q,
          K,
          !1,
          function(t) {
            n("zhtx");
          },
          null,
          null
        ).exports,
        et = n("fZjL"),
        nt = n.n(et),
        ot = n("Ml+6"),
        it = (n("ll8a")(ot), n("3mde"));
      function at() {
        var t = new ot.Scene(),
          e = window.innerWidth / window.innerHeight,
          n = new ot.PerspectiveCamera(75, e, 100, 5e4);
        (n.position.z = 5500), (n.position.y = -100);
        var o = new ot.WebGLRenderer({ antialias: !0 });
        new ot.Raycaster(), new ot.Vector2();
        o.setPixelRatio(window.devicePixelRatio),
          o.setSize(window.innerWidth, window.innerHeight);
        var i = document.getElementById("display-map-container"),
          a = null,
          r = {};
        (l = new ot.FileLoader()).load(
          "https://s3.amazonaws.com/duhaime/blog/tsne-webgl/data/image_tsne_projections.json",
          function(t) {
            (a = JSON.parse(t)), m();
          }
        );
        for (var l = new ot.TextureLoader(), c = 0; c < 5; c++) {
          var s = "https://s3.amazonaws.com/duhaime/blog/tsne-webgl/data/";
          (s += "atlas_files/32px/atlas-" + c + ".jpg"),
            l.load(s, u.bind(null, c));
        }
        function u(t, e) {
          var n = new ot.MeshBasicMaterial({ map: e });
          (r[t] = n), m();
        }
        function m() {
          5 === nt()(r).length &&
            a &&
            (function() {
              document.addEventListener("mousedown", p, !1);
              for (var t = 0; t < 5; t++) {
                for (
                  var e = new ot.Geometry(), n = 0;
                  n < D.cols * D.rows;
                  n++
                ) {
                  var o = d(t, n);
                  e = E((e = h((e = F(e, o)))), n);
                }
                A(e, r[t]);
              }
            })();
        }
        var B = { width: 32, height: 32 },
          D = { width: 2048, height: 2048, cols: 64, rows: 64 };
        function d(t, e) {
          var n = t * D.rows * D.cols + e,
            o = a[n];
          return (o.x *= 1200), (o.y *= 600), (o.z = e / 100 - 200), o;
        }
        function F(t, e) {
          return (
            t.vertices.push(
              new ot.Vector3(e.x, e.y, e.z),
              new ot.Vector3(e.x + B.width, e.y, e.z),
              new ot.Vector3(e.x + B.width, e.y + B.height, e.z),
              new ot.Vector3(e.x, e.y + B.height, e.z)
            ),
            t
          );
        }
        function h(t) {
          var e = new ot.Face3(
              t.vertices.length - 4,
              t.vertices.length - 3,
              t.vertices.length - 2
            ),
            n = new ot.Face3(
              t.vertices.length - 4,
              t.vertices.length - 2,
              t.vertices.length - 1
            );
          return t.faces.push(e, n), t;
        }
        function p(t) {
          var e = new ot.Vector3(
              (t.clientX / window.innerWidth) * 2 - 1,
              (-t.clientY / window.innerHeight) * 2 + 1,
              0.5
            ),
            o = new ot.Raycaster();
          o.setFromCamera(e, n);
          var i = o.intersectObjects([mesh]);
          i.length > 0 &&
            (console.log(i[0].point), window.open(i[0].object.userData.URL));
        }
        function E(t, e) {
          var n = (e % D.cols) * (B.width / D.width),
            o =
              1 -
              Math.floor(e / D.cols) * (B.height / D.height) -
              B.height / D.height;
          return (
            t.faceVertexUvs[0].push([
              new ot.Vector2(n, o),
              new ot.Vector2(n + B.width / D.width, o),
              new ot.Vector2(n + B.width / D.width, o + B.height / D.height)
            ]),
            t.faceVertexUvs[0].push([
              new ot.Vector2(n, o),
              new ot.Vector2(n + B.width / D.width, o + B.height / D.height),
              new ot.Vector2(n, o + B.height / D.height)
            ]),
            t
          );
        }
        function A(e, n) {
          e = new ot.BufferGeometry().fromGeometry(e);
          var o = new ot.Mesh(e, n);
          o.position.set(0, 0, 0),
            (o.userData = { URL: "http://google.com" }),
            t.add(o);
        }
        var f = new ot.PointLight(16777215, 1, 0);
        f.position.set(1, 1, 100), t.add(f);
        var g = new it(n);
        i.appendChild(o.domElement),
          window.addEventListener("resize", function() {
            (n.aspect = window.innerWidth / window.innerHeight),
              n.updateProjectionMatrix(),
              o.setSize(window.innerWidth, window.innerHeight),
              g.handleResize();
          }),
          (function e() {
            requestAnimationFrame(e), o.render(t, n), g.update();
          })();
      }
      var rt = {
          name: "DisplayMap",
          mounted: function() {
            at();
          }
        },
        lt = {
          render: function() {
            var t = this.$createElement;
            return (this._self._c || t)("div", {
              attrs: { id: "display-map-container" }
            });
          },
          staticRenderFns: []
        };
      var ct = n("VU/8")(
          rt,
          lt,
          !1,
          function(t) {
            n("Nv4l");
          },
          null,
          null
        ).exports,
        st = 0,
        ut = n("xhSa"),
        mt = {
          components: { slideText: s },
          methods: {
            routerChange: function(t) {
              this.$router.push(t);
            },
            sendsend: function() {
              this.$socket.emit("pageNumYo");
            },
            rendering: function() {
              this.iframeSrc = "http://localhost:3001/";
              for (var t = [], e = 0; e < ut.length; e++)
                ut[e].num == st && ((t = ut[e].color), ut[e].num);
              console.log(t);
              var n = { name: 1, colors: t };
              "complete" == document.readyState &&
                window.addEventListener("message", function(t) {
                  document
                    .getElementById("iframeId")
                    .contentWindow.postMessage(n, "*");
                });
            }
          },
          sockets: {
            connect: function() {
              console.log("sockdddddet connected");
            },
            displayControl: function(t) {
              console.log(t), window.location.reload(!0), this.routerChange(t);
            },
            connectCountDeliv: function(t) {},
            pageNumRe: function(t) {
              st = t;
            },
            startPageReceive: function(t) {
              (st = t), this.rendering();
            }
          },
          data: function() {
            return { iframeSrc: "" };
          },
          created: function() {
            for (var t = 1; t < 99990; t++) window.clearInterval(t);
          },
          mounted: function() {},
          updated: function() {}
        },
        Bt = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { attrs: { id: "display-page-container" } }, [
              e("div", { attrs: { id: "display-page-top" } }, [
                e("iframe", {
                  attrs: {
                    id: "iframeId",
                    width: "1920",
                    height: "1200",
                    src: this.iframeSrc,
                    frameborder: "0"
                  }
                })
              ])
            ]);
          },
          staticRenderFns: []
        };
      var Dt = n("VU/8")(
          mt,
          Bt,
          !1,
          function(t) {
            n("9E6J");
          },
          null,
          null
        ).exports,
        dt = {
          components: {},
          sockets: {
            connect: function() {
              console.log("socket connected");
            },
            otherConnect: function(t) {
              console.log(t);
            },
            displayControl: function(t) {
              console.log(t), this.routerChange("displayselect");
            }
          },
          methods: {
            textChange: function() {
              var t = this;
              this.intervalid1 = setInterval(function() {
                t.textNum++,
                  t.textNum > t.texts.length && (t.textNum = 0),
                  (t.displayText = t.texts[t.textNum]),
                  t.phoneChange();
              }, 1500);
            },
            phoneChange: function() {
              "Smartphone" == this.displayText
                ? ((this.imageSrc =
                    "static/smartphones/" + this.phoneNum + ".jpg"),
                  this.phoneNum++,
                  this.phoneNum > 7 && (this.phoneNum = 1),
                  (this.imageShow = !0))
                : (this.imageShow = !1);
            }
          },
          data: function() {
            return {
              texts: [
                "Enter to",
                "orgd-list.kr",
                "by your",
                "Smartphone",
                "and control",
                "the screen"
              ],
              displayText: "",
              textNum: 0,
              intervalid1: "",
              imageSrc: "static/smartphones/1.jpg",
              imageShow: !1,
              phoneNum: 1
            };
          },
          mounted: function() {
            (this.displayText = this.texts[0]), this.textChange();
          }
        },
        Ft = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { attrs: { id: "url-container" } }, [
              e("div", { attrs: { id: "text-container" } }, [
                e("p", { domProps: { textContent: this._s(this.displayText) } })
              ]),
              this._v(" "),
              this.imageShow
                ? e("div", { attrs: { id: "phone-container" } }, [
                    e("img", { attrs: { src: this.imageSrc, id: "phone-img" } })
                  ])
                : this._e()
            ]);
          },
          staticRenderFns: []
        };
      var ht = n("VU/8")(
          dt,
          Ft,
          !1,
          function(t) {
            n("5axL");
          },
          "data-v-0f4fc8ea",
          null
        ).exports,
        pt = {
          components: { leftTop: S },
          sockets: {
            connect: function() {
              console.log("socket connected");
            },
            otherConnect: function(t) {
              console.log(t);
            }
          },
          methods: {
            changeBackground: function(t) {},
            setIntervalback: function() {},
            doc_del_rendar: function() {
              this.$modal.show(
                L,
                { hot_table: "data", modal: this.$modal },
                {
                  name: "dynamic-modal",
                  width: "200px",
                  height: "300px",
                  draggable: !0
                }
              );
            }
          },
          data: function() {
            return {};
          },
          mounted: function() {
            var t = this;
            this.changeBackground(0),
              setInterval(function() {
                t.setIntervalback(), t.changeBackground(0);
              }, 1);
            var e = document.querySelector("#canvas_picker"),
              n = e.getContext("2d");
            (e.width = 5e3), (e.height = 5e3);
            var o = new Image();
            (o.src = "static/smartphones/back.png"),
              o.addEventListener(
                "load",
                function() {
                  n.drawImage(o, 0, 0);
                },
                !1
              ),
              document
                .getElementById("canvas_picker")
                .addEventListener("click", function(t) {
                  var e = t.pageX - $("#canvas_picker").offset().left,
                    o = t.pageY - $("#canvas_picker").offset().top,
                    i = n.getImageData(e, o, 1, 1).data,
                    a = i[0] + "," + i[1] + "," + i[2];
                  $("#rgb input").val(a), console.log(a);
                });
          }
        },
        Et = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("transition", { attrs: { name: "fade" } }, [
              e(
                "div",
                { attrs: { id: "mainCon" } },
                [
                  this._v("\r\n         sss\r\n       "),
                  e("modals-container"),
                  this._v(" "),
                  e("leftTop"),
                  this._v(" "),
                  e("canvas", {
                    attrs: { width: "600", height: "300", id: "canvas_picker" }
                  })
                ],
                1
              )
            ]);
          },
          staticRenderFns: []
        };
      var At,
        ft = n("VU/8")(
          pt,
          Et,
          !1,
          function(t) {
            n("pjRX");
          },
          "data-v-6059fa98",
          null
        ).exports,
        gt = 90,
        vt = { x: 16.4 },
        Ct = 0,
        wt = [
          12,
          13,
          16,
          38,
          39,
          43,
          46,
          64,
          66,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          82,
          85,
          97,
          98,
          130,
          131,
          142,
          144,
          145,
          146,
          148,
          149,
          153,
          154,
          157,
          158,
          159,
          160,
          162,
          165,
          179,
          208,
          209,
          210,
          211,
          212
        ],
        yt = [
          20,
          28,
          50,
          51,
          52,
          60,
          65,
          67,
          72,
          79,
          80,
          90,
          95,
          99,
          100,
          137,
          138,
          139,
          151,
          172,
          175,
          176,
          178,
          187,
          188,
          189,
          190,
          191,
          192,
          193,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          207
        ],
        _t = {
          name: "DisplayMain",
          components: { displayTop: B, displayBot: p },
          data: function() {
            return {
              imageSrc: "/static/images/1_1.jpg",
              backimageId: "backImage",
              imageBright: 1,
              imageNum: 1
            };
          },
          sockets: {
            connect: function() {
              console.log("sockdddddet connected");
            },
            displayControl: function(t) {
              console.log(t), this.routerChange(t);
            },
            connectCountDeliv: function(t) {
              console.log(t),
                (Ct = t) > 1 ? this.thetaUp(20.2) : this.thetaUp(16.4);
            }
          },
          created: function() {},
          mounted: function() {
            (gt = 90),
              this.changeImage(),
              this.drawBackground(),
              Ct > 1 && this.thetaUp(17);
          },
          beforeDestroy: function() {
            for (var t = 1; t < 99990; t++) window.clearInterval(t);
            cancelAnimationFrame(At);
          },
          methods: {
            drawBackground: function() {
              var t = n("pcrw"),
                e = n("pyS4"),
                o = (n("pb35"), document.getElementById("canvas"));
              (o.width = 1920), (o.height = 1200);
              var i = o.getContext("webgl"),
                a = e(i).attr("aPosition", [
                  -1,
                  -1,
                  -1,
                  1,
                  -1,
                  -1,
                  1,
                  1,
                  -1,
                  -1,
                  -1,
                  -1,
                  1,
                  1,
                  -1,
                  -1,
                  1,
                  -1
                ]),
                r = n("3SYt"),
                l = t(i, n("X6+0"), r);
              !(function t() {
                l.bind(),
                  a.bind(l),
                  (l.uniforms.uSunPos = [0, 0.3 * Math.cos(vt.x) + 0.2, -1]),
                  a.draw(),
                  (At = requestAnimationFrame(t));
              })();
            },
            changeImage: function() {
              var t = this;
              setTimeout("location.reload()", 6e6),
                setInterval(function() {
                  t.$socket.emit("colorChange", t.imageNum),
                    D.$emit("imageNumSend", t.imageNum),
                    t.imageNum < 212
                      ? (t.imageNum++,
                        -1 != yt.indexOf(t.imageNum) && t.imageNum++)
                      : (t.imageNum = 1),
                    -1 == wt.indexOf(t.imageNum)
                      ? (t.imageSrc = "/static/images/" + t.imageNum + "_1.jpg")
                      : (t.imageSrc =
                          "/static/images/" + t.imageNum + "_1.png"),
                    D.$emit("imageNumSend", t.imageNum);
                }, 3e3),
                setInterval(function() {
                  0.01,
                    (gt += 0.6 * 3),
                    (document.getElementById("backImage").style.transform =
                      " perspective(250px) rotateX(0deg) rotateY(" +
                      gt +
                      "deg)");
                }, 30);
            },
            routerChange: function(t) {
              this.$router.push(t);
            },
            thetaUp: function(t) {
              var e = void 0;
              new E.Tween(vt)
                .to({ x: t }, 15e3)
                .onComplete(function() {
                  cancelAnimationFrame(e);
                })
                .start();
              console.log(vt.x),
                (e = requestAnimationFrame(function t(n) {
                  E.update(n), (e = requestAnimationFrame(t));
                }));
            }
          }
        },
        xt = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("transition", { attrs: { name: "fade" } }, [
              n(
                "div",
                { attrs: { id: "dislpayBody" } },
                [
                  n("canvas", { attrs: { id: "canvas" } }),
                  t._v(" "),
                  n(
                    "div",
                    {
                      staticClass: "clipping",
                      style: { fiter: "brightness(1)" },
                      attrs: { id: t.backimageId },
                      on: {
                        click: function(e) {
                          t.changeImage();
                        }
                      }
                    },
                    [
                      n("div", { attrs: { id: "backImageWrapper" } }, [
                        n("img", { attrs: { src: t.imageSrc } })
                      ])
                    ]
                  ),
                  t._v(" "),
                  n("displayTop"),
                  t._v(" "),
                  n("displayBot")
                ],
                1
              )
            ]);
          },
          staticRenderFns: []
        };
      var St = n("VU/8")(
        _t,
        xt,
        !1,
        function(t) {
          n("cyxu");
        },
        "data-v-1c7f853e",
        null
      ).exports;
      o.a.use(r.a);
      var bt = new r.a({
          routes: [
            { path: "/displaymain", name: "DisplayMain", component: _ },
            { path: "/displaymap", name: "DisplayMap", component: ct },
            { path: "/displaylist", name: "DisplayList", component: tt },
            { path: "/controllist", name: "ControlList", component: U },
            { path: "/", name: "ControlMain", component: H },
            { path: "/controlpage", name: "ControlPage", component: Z },
            { path: "/displaypage", name: "DisplayPage", component: Dt },
            { path: "/connectUrl", name: "ConnectUrl", component: ht },
            { path: "/controlcolor", name: "ControlColor", component: ft },
            { path: "/displayselect", name: "DisplaySelect", component: St }
          ]
        }),
        kt = n("mtWM"),
        It = n.n(kt),
        Nt = n("rifk"),
        Mt = n.n(Nt),
        Rt = (n("NOnh"), n("42O3"), n("hMcO")),
        jt = n.n(Rt);
      o.a.use(Mt.a, { dynamic: !0 });
      n("6A3X"),
        o.a.use(jt.a, "http://localhost:65080"),
        (o.a.prototype.$http = It.a),
        (o.a.config.productionTip = !1),
        (window.eventBus = new o.a()),
        new o.a({
          el: "#app",
          router: bt,
          components: { App: a },
          template: "<App/>"
        });
    },
    Nv4l: function(t, e) {},
    OYGR: function(t, e) {},
    Utvk: function(t, e) {},
    "X6+0": function(t, e) {
      t.exports =
        "#define GLSLIFY 1\n#define SHADER_NAME quad.vert\n\nattribute vec3 aPosition;\n\nvarying vec3 vPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1.0);\n    vPosition = aPosition;\n}";
    },
    YNkF: function(t, e) {},
    cyxu: function(t, e) {},
    h5C8: function(t, e) {},
    jLwf: function(t, e) {},
    mZpV: function(t, e) {
      t.exports =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjIuMjQgMTAzLjU0Ij48dGl0bGU+7J6Q7IKwIDM8L3RpdGxlPjxnIGlkPSLroIjsnbTslrRfMiIgZGF0YS1uYW1lPSLroIjsnbTslrQgMiI+PGcgaWQ9IuugiOydtOyWtF8xLTIiIGRhdGEtbmFtZT0i66CI7J207Ja0IDEiPjxwYXRoIGQ9Ik0xNzUsMzkuMTUsMTQ3Ljc0LDE1LjkxLDE2MS42MywwbDYwLjYxLDUxLjc3LTYwLjYxLDUxLjc3TDE0OCw4Ny44OWwyNy4yOC0yMy4yNEgwVjM5LjE1WiIvPjwvZz48L2c+PC9zdmc+";
    },
    pjRX: function(t, e) {},
    ubwJ: function(t, e) {},
    xhSa: function(t, e) {
      t.exports = [
        {
          num: 1,
          title: "비록 성숙한 인격일지라도 미성숙한 방어기제를 사용할 수 있다",
          color: ["#EC5D19", "#180A05", "#FAC9AA"]
        },
        {
          num: 2,
          title: "그래서 이 책에는 트위터와 일치하는 작은 규칙들이 있다",
          color: ["#1F1717", "#8C6B6D", "#CC5E6A"]
        },
        {
          num: 3,
          title:
            "말과 언어에 대한 농담, 거짓말, 환상 하찮고 의미 없다는 것에 대한 가치를 나열해 놓은 책이다",
          color: ["#D5C3B7", "#2E2621", "#8C7767"]
        },
        {
          num: 4,
          title:
            "문자에서 볼 수 있는 속공간이 문자에서 느껴지는 모호함이라고 인지하였고, 그 공간을 <Freckle> 주근깨를 떠올릴 수 있는 점으로 채워넣었습니다",
          color: ["#BB7C6C", "#C6AD9D", "#6D4C3F"]
        },
        {
          num: 5,
          title: "끝까지 하지 않으면 결과를 볼 수 없다는 주제로 작업하였다",
          color: ["#FFFFFF", "#DDFDE3", "#DADADA"]
        },
        {
          num: 6,
          title:
            "교감한다는 것은 접촉을 통해 이루어지며, 이것은 곧 움직임으로 나타난다",
          color: ["#F4A4C9", "#DA93B4", "#AF7893"]
        },
        {
          num: 7,
          title: "선크림의 시의성을 고려하였다",
          color: ["#F1BD0B", "#A3973C", "#364B66"]
        },
        {
          num: 8,
          title:
            "② 비유법에는 늘 원관념과 보조관념, 그리고 이 둘의 공통점이 존재한다",
          color: ["#0F0F0F", "#A6A6A6", "#0B0B0B"]
        },
        {
          num: 9,
          title:
            "아이들이 노는 모습을 관찰해서 추상적인 형태로 만들어 책을 구성했다",
          color: ["#1D95BF", "#020304", "#E6DC22"]
        },
        {
          num: 10,
          title: "비움: 내지가 녹는 듯이 표현했다",
          color: ["#E4E4E4", "#1B1B1C", "#8B6C4A"]
        },
        {
          num: 11,
          title: "그러나 방법은 없다",
          color: ["#AC8770", "#2C8456", "#413C52"]
        },
        {
          num: 12,
          title:
            "최초의 근대 여성 작가 김명순의 작품 중 <의심의 소녀>라는 짧은 단편소설을 골라서 작업했습니다",
          color: ["#C0C0C0", "#3A3A3A", "#818181"]
        },
        {
          num: 13,
          title:
            "이 작업은 개별적인 하나의 책이자 가상의 시리즈 첫 번째 책이기도 합니다",
          color: ["#8E8E8E", "#8B8B8B", "#8E8E8E"]
        },
        {
          num: 14,
          title: "필리핀에서 느꼈던 색감들, 나에게는 시각적 힐링이 되었다",
          color: ["#EFF3F4", "#97BE4F", "#C1D4A0"]
        },
        {
          num: 15,
          title:
            "<네이밍>: slim (날씬한) + in (속으로) slim (날씬한) + 人 (사람)",
          color: ["#010101", "#BEBEBE", "#646464"]
        },
        {
          num: 16,
          title:
            "저는 하나의 변화를 스크린의 크기 변화라고 가정하고 작업하였습니다",
          color: ["#0F0F0F", "#616161", "#CDCDCD"]
        },
        {
          num: 17,
          title:
            "인터넷에서 불법으로 올라가있는 단편 소설을 찾아가는 과정을 소설로 작성했다",
          color: ["#F0F0EF", "#926C4A", "#A8A19D"]
        },
        {
          num: 18,
          title:
            "성 소수자 중심의 내용을 다룬 책을 선정하여, 은어로 사용되는 단어들의 원래 의미를 책의 표지에 넣어 제작했다",
          color: ["#0C0C0C", "#F6F6F6", "#757575"]
        },
        {
          num: 19,
          title:
            "일본 전통무용인 부토의 특징인 흑, 백, 적과 기형적인 형태를 사용하여 가상의 브랜딩을 진행하였다",
          color: ["#FB0000", "#1B0100", "#820002"]
        },
        {
          num: 21,
          title: "쓰레기란 그런것이다",
          color: ["#080403", "#E84A2D", "#927CB4"]
        },
        {
          num: 22,
          title:
            "사람이 느끼는 감정은 같은 감정, 혹은 같은 생각이라도 표현의 방식에 따라 그 모습이 달라져 여러 개의 서로 다른 형태를 띈 갈래들로 나뉘게 됩니다",
          color: ["#CCCCCC", "#274191", "#6D7BAB"]
        },
        {
          num: 23,
          title:
            "과제가 자유주제였기 때문에 평소 관심사 중 하나인 기하 도형을 주제로 선정했습니다",
          color: ["#DA3113", "#4774B3", "#A1B92E"]
        },
        {
          num: 24,
          title:
            "예술사조 중 ‘순수주의’를 선택하여 가장 상업적이라고 느꼈던 ‘마트 찌라시’를 선택한 사조에 따라 재해석 해보았습니다",
          color: ["#CFB987", "#CB3125", "#686490"]
        },
        {
          num: 25,
          title:
            "전시 포스터는 작가들의 작업 일부분을 가져와 제 나름의 시각방식으로 그래픽을 만들어 작업한 결과물입니다",
          color: ["#BD8EA6", "#CAC587", "#B83421"]
        },
        {
          num: 26,
          title: "역동적인 몸을 표현하였다",
          color: ["#010101", "#0000EA", "#EB9F85"]
        },
        {
          num: 27,
          title:
            "두 번째 책 작업 첫 단계에서 독자가 이 책을 읽은 뒤, 도대체 이게 무슨 내용이지",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 29,
          title: "데스카페에선 죽음을 터부시하기보다 밖으로 드러냅니다",
          color: ["#FDFCFB", "#8F7575", "#F1CD8F"]
        },
        {
          num: 30,
          title:
            "1인가구의 증가로인한 HMR(Home Meal Replacement)시장의 확대로, 영양도 풍부하고 간단히 먹을 수 있는 떡의 수요가 늘어나고 있습니다",
          color: ["#ECEFF2", "#111312", "#94969B"]
        },
        {
          num: 31,
          title:
            "해당 파트에 실린 조현열 교수님의 작업물은 대부분 대학원 시절의 작업들이다",
          color: ["#FCFCFC", "#0B0B0B", "#7C7C7C"]
        },
        {
          num: 32,
          title:
            "서체 아방가르드의 폭과 굵기에 변화를 준 5개의 서체를 제작했다",
          color: ["#FCFCFC", "#C0C0BF", "#494848"]
        },
        {
          num: 33,
          title:
            "스크린매체가 인쇄매체와는 달리 실시간으로 그 변화를 확인할 수 있다는 점",
          color: ["#010101", "#787878", "#F2F2F2"]
        },
        {
          num: 34,
          title: "<말 사이의 거리>의 리플렛을 재구성 및 디자인하였다",
          color: ["#0AAE43", "#D8B6E0", "#AAB5B9"]
        },
        {
          num: 35,
          title:
            "스캐너에 신문을 직접 비벼 만든 이미지로, 어떠한 포토샵 과정도 거치지 않은 책입니다",
          color: ["#7FD2EA", "#FDFBFA", "#BDD9E4"]
        },
        {
          num: 36,
          title: "문장을 발췌해 새롭게 이야기를 재구성한 모션그래픽 작업",
          color: ["#D9D7CE", "#BCACA3", "#BF7663"]
        },
        {
          num: 37,
          title: "<94페이지 다섯 번째 줄 이야기>의 연장선상에 있는 작업",
          color: ["#0220C8", "#6066CF", "#E3E3F3"]
        },
        {
          num: 38,
          title:
            "이 책은 두 가지 상반되는 단어 Quiet(조용한), Noisy(시끄러운)를 점, 선, 면이라는 기본 도형에 입각하여 보여준다",
          color: ["#E5D903", "#F3F1F2", "#181918"]
        },
        {
          num: 39,
          title:
            "디지털 환경에서 순식간에 일어날 수 있는 기능을 아날로그화 시키는 과정에서 상당히 많은 시간과 셋팅이 들어갔다",
          color: ["#FEFEFD", "#1F2D5A", "#8E9120"]
        },
        {
          num: 40,
          title:
            "촬영한 곡선들을 이용해 새로운 덩어리를 만들고 그 덩어리들을 경우의 수에 따라 레이어를 겹쳐 단계적으로 표현하였다",
          color: ["#323039", "#904C4D", "#898A69"]
        },
        {
          num: 41,
          title:
            "먼저 책 겉면에 보이는 이미지들은 마약들의 환각과 흡입 방식, 해당식물의 이미지등으로 모 듈을 만들어 디자인 했고 전체적으로 컬러와 흑백으로 나눠서 진행했다",
          color: ["#484A49", "#141315", "#6A6882"]
        },
        {
          num: 42,
          title:
            "몸이 주인공이 아닌 조연의 역할을 한다는 것에 흥미를 느껴 주 사물로 선 정하고 폰트의 부가적인 부분인 속 공간(여백)을 활용해 폰트를 디자인 했다",
          color: ["#282626", "#F7F7F7", "#868585"]
        },
        {
          num: 43,
          title: "빛의 투과, 반사, 직진, 분산과 같은 성질",
          color: ["#635C78", "#161517", "#7B8673"]
        },
        {
          num: 44,
          title: "우리는 모두 바쁜 삶에서 살고있습니다",
          color: ["#C3C5D5", "#8186AF", "#1C3D84"]
        },
        {
          num: 45,
          title: "삼성전자주식회사 Samsung Electronics ",
          color: ["#0C04EB", "#000000", "#000000"]
        },
        {
          num: 46,
          title: "아서 클라크 단편선 Arthur C. Clarke Short Stories",
          color: ["#020202", "#303131", "#BBD2E6"]
        },
        {
          num: 47,
          title:
            "영화에서 시리얼 박스가 노출되는 장면을 이용해 디자인한 책이다",
          color: ["#F4F6F6", "#030303", "#B1B4B4"]
        },
        {
          num: 48,
          title: "연표의 순서는 시대별이 아니라 강의를 한 순서대로 배치하였다",
          color: ["#FCFCFA", "#CBC5C1", "#2F2C2D"]
        },
        {
          num: 49,
          title:
            "전쟁의 목적이 시민들을 위한 것입니까, 개인적인 야망인 것입니까",
          color: ["#6F95A6", "#5D6275", "#1F2126"]
        },
        {
          num: 50,
          title: "None Project",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 53,
          title: "샌드위치와 관련된 잡다한 정보와 취향들을 엮은 모음집",
          color: ["#FEFEFE", "#646363", "#B2B1B1"]
        },
        {
          num: 54,
          title: "최근에 있었던 집의 공사 과정을 사진으로 담았다",
          color: ["#FEFEFE", "#A3A3A4", "#DBB4AC"]
        },
        {
          num: 55,
          title: "새로 바뀐 방 속 나의 익숙한 물건들에 대한 설명",
          color: ["#B0B0B0", "#E9E9E9", "#626060"]
        },
        {
          num: 56,
          title: "유니티가 사용할 수 있는 인풋 중 하나로 자이로스코프",
          color: ["#392F2B", "#7A7684", "#CFCED2"]
        },
        {
          num: 57,
          title: "유니티가 사용할 수 있는 인풋 중 하나로 자이로스코프(2)",
          color: ["#101010", "#4B4947", "#969696"]
        },
        {
          num: 58,
          title:
            "그래픽디자인은 주제를 더 적극적이고 어울리게 전달하는 적합한 전달 방식에 대해서 찾아가는 분야라는 주제 아래, 표제어를 선정해 사전을 만듦",
          color: ["#C8C7C6", "#121215", "#696768"]
        },
        {
          num: 59,
          title:
            "글 또한 어느 방향으로 흘러가는지에 따라 시선의 속도, 강약 등을 조절할 수 있지만 만화는 좀 더 강하고, 두껍고, 명료한 대비를 보여주곤 한다",
          color: ["#FEFEFE", "#9B9B9B", "#242424"]
        },
        {
          num: 61,
          title:
            "농도의 차이를 보여줄 수 있는 새로운 코딩시스템을 서체의 이름과 연관지어 제작하는 작업을 했다",
          color: ["#24221F", "#F0DFC8", "#7F7365"]
        },
        {
          num: 62,
          title:
            "계원예술대학교 1학년 1학기 그래픽디자인의 역사 수업 내용을 1920년(더 이전의 요하네스 구텐베르크 금속활자 발명부터)~현재에 이르기까지 연도별로 정리한 연표이다",
          color: ["#F7F7F7", "#B9B9BA", "#302F2F"]
        },
        {
          num: 63,
          title: "이렇듯 이 책은 평소 꿈에 대한 호기심에서 출발했다",
          color: ["#71C7DF", "#CAD6C0", "#E2E361"]
        },
        {
          num: 64,
          title: "벽에 페인트칠하는 방법을 벡터 그래픽으로 설명한 그림책이다",
          color: ["#EEF0EF", "#97BC4E", "#2A7FBB"]
        },
        {
          num: 66,
          title:
            "시험지 양식은 수학능력평가를 따랐으며, 수학능력평가 형식의 OMR카드와 답안지도 제작했다",
          color: ["#EAEAEA", "#FDFDFD", "#D1D1D1"]
        },
        {
          num: 68,
          title:
            "고스를 상징하는 다섯 가지 기호인 십자가, 하트, 핏방울, 달, 관을 참으로 선택할 수 있는 DIY 악세사리 브랜드이다",
          color: ["#F21412", "#FEF7F8", "#F7B0B2"]
        },
        {
          num: 69,
          title: "책은 아카이빙한 음식의 레시피가 실려있다",
          color: ["#DCCCD5", "#412F31", "#759C45"]
        },
        {
          num: 70,
          title: "마치 주인공이 이 텍스트에도 침범하여 글자들도 지워낸 것처럼",
          color: ["#C9C9C9", "#444444", "#767676"]
        },
        {
          num: 71,
          title:
            "그런데 이 영상을 보고 ‘효율성만을 따지는 기계적인 시대에 효율성 최하의 장치인 골드버그 장치는 인간만이 할 수 있는 것이 아닐까.’라는 생각이 들었고, 이 생각에서 프로젝트가 시작됐다",
          color: ["#FFFFFF", "#D9D9D9", "#F7F7F7"]
        },
        {
          num: 73,
          title:
            "이 종교의 영향으로 그의 작업은 모두 작업(공간) 자체에 집중하기 보다 나에 대한 명상으로 이어지도록 유도하는 작업이 많다",
          color: ["#F9F8F7", "#667372", "#D8564E"]
        },
        {
          num: 74,
          title:
            "악보를 분해/재조립 하여 공군 군악대의 모습을 직접적으로 풀어냈다",
          color: ["#FCFCFC", "#A4A4A4", "#404040"]
        },
        {
          num: 75,
          title: "철과 예술: 차가운 철, 뜨거운 예술",
          color: ["#D71519", "#301D1B", "#A8A4A3"]
        },
        {
          num: 76,
          title: "비와 그래픽 디자인의 역사의 타임라인을 결합",
          color: ["#F0F0F0", "#010101", "#979797"]
        },
        {
          num: 77,
          title:
            "꿈에 대한 책 3권을 직접 선정하여, 가상의 총서로 묶어 표지를 디자인하였습니다",
          color: ["#282A3A", "#EDECED", "#D06522"]
        },
        {
          num: 78,
          title:
            "로버트 루이스 스티븐슨의 단편 공포 소설 ‘시체도둑’을 소책자로 편집 디자인하였습니다",
          color: ["#301D52", "#706743", "#911D44"]
        },
        {
          num: 81,
          title: "가상의 애완 타란튤라 샵을 기획, 브랜드 디자인 하였습니다",
          color: ["#7F7760", "#434AA2", "#D91819"]
        },
        {
          num: 82,
          title: "선정된 각 영화의 심볼을 지정하여 이미지로 활용했습니다",
          color: ["#0E0B0A", "#A9937C", "#D1607A"]
        },
        {
          num: 83,
          title: "원주동부프로미는 프로농구팀으로 ‘산성’이라는 별명을 갖고있다",
          color: ["#3BA28A", "#328084", "#CFE5CD"]
        },
        {
          num: 84,
          title: "가운데 칼집을내 접는 방식을 활용했으며, 2도 인쇄로 진행했다",
          color: ["#0A0A0A", "#FDF7F9", "#EF3264"]
        },
        {
          num: 85,
          title:
            "제가 좋아하는 음악들을 셀렉해서 그 음악을 듣고 느낀 감정을 추상적으로 표현한 일러스트를 그렸습니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 86,
          title:
            "패션을 사랑하는 능력있는 여성을 타겟으로 삼아 현대를 살고있는 젊고 깨어있는 여성들에게 푸시버튼은 ‘새로운 여성성을 만드는 독특한 패션 브랜드’ 라는 강력한 인상을 주고자 했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 87,
          title:
            "아모레 퍼시픽 갤러리에 전시 된 다양한 현대 미술 작품들은 4곳의 다양한 장소에 설치되어 있습니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 88,
          title:
            "어셔가의 몰락 소설 사이사이에 세로로 긴 성의 이미지들을 찾아 넣었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 89,
          title: "검은 고양이와 흑백 사진을 이용하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 90,
          title: "책에 나와 있는 것들 중 ‘문’에 관한 문장을 선택했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 91,
          title: "해당 단어들만이 남아있도록 웹페이지를 만들었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 92,
          title: "인간에게 길러지는 햄스터에 대한 동화책이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 93,
          title: "고양이의 형태를 이용하여 농담을 하는 동화책",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 94,
          title: "임신 계획이 없는 여성을 주 타깃으로 삼아 제작하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 95,
          title:
            "패키지 여행사에서 5개월간 일하며 학교에서 배웠던 디자인 규칙을 모두 깨부숴야 했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 96,
          title: "그리고 분해한 요소들을 이용하여 스티커를 만들었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 97,
          title:
            "가장 좋았던, 가장 오래 기억하고 싶었던 경험을 향(향기)으로 담아서 오랫동안 간직할 수 있도록 도와주는 프로젝트이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 98,
          title:
            "‘마시멜로 이야기’ 책을 읽고 딱 떠오르는 시간, 방향성, 마시멜로",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 99,
          title: "취향 찾는 게임",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 100,
          title: "위의 작업물을 설명하는 포스터입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 101,
          title: "영화 신시티의 리플렛입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 102,
          title:
            "쉽게 버려지고 교체되는 일회성 전단지의 디자인을 활용해 그래픽실험을 진행하는 책입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 103,
          title:
            "그 과정에서 중요한 것은 해당 세계를 해석함에 있어서 개입되는 작업자 스스로의 주관성과 자의성을 배제시키는 것이었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 104,
          title:
            "자살가게는 자살용품을 파는 가게로 자살이란 사회적 문제를 역설적으로 다뤘다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 105,
          title: "Bembo서체의 역사, 정보에 대한 책을 제작",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 106,
          title: "나에대한 성향 10가지를 노래 10곡의 앨범아트로 표현했다.",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 107,
          title:
            "매순간 우리는 빛과 어둠의 경계를 넘나들며 살아간다고 생각한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 108,
          title:
            "회차는 1주를 기준으로 했으며 한글 폰트 한가지, 영문 폰트 한가지를 사용해 폰트 크기와 두께의 변화 없이 레이아웃을 짜서 포스터를 제작하는 방식이였습니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 109,
          title:
            "순간 순간 좋지 못한 사건들을 “얼간이 같았던 순간”이라는 자조적인 시선으로 풀었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 110,
          title:
            "서체의 속공간을 뜻하는 카운터와 펀치를 결합해 그들에게 카운터펀치를 먹이고자 한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 111,
          title:
            "중세시대 흑사병의 느낌을 주기 위해 블랙 앤 화이트를 적극 활용하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 112,
          title:
            "일본 애니메이션에서 쉽게 볼 수 있는 안경 쓴 캐릭터(메가네 캐릭터)들이 안경을 고쳐 올리는 순간, 안경에 빛이 반사되는 모습에 흥미를 느껴 시작한 작업이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 113,
          title: "원과 자궁은 여러 가지 공통점이 있다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 114,
          title: "작업 과정에서의 계획과 실행에 대한 내용을 담은 포스터",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 115,
          title:
            "어린이 야구단원을 모집하는 전단이 뿌려졌다는 본문 내용을 전단으로 제작하여 LP에 들어가는 속지로 사용하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 116,
          title: "종이가 쌓이고 접히고 펼쳐지는 이미지로 화면 구성",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 117,
          title:
            "우연히 같은 장소에서 찍었던 하늘 사진들을 모아 소책자를 디자인했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 118,
          title: "T , SHORT , LONG 으로 구성되어 있다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 119,
          title:
            "먼저 학생들이 각자 물건을 정렬하는 조건을 정하여 조별로 랜덤한 물건들을 정렬한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 120,
          title: "(포스터를 제작하여 설치했을 때 모습)",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 121,
          title:
            "전공수업 중 드로잉이 제일 재미없는 과목이라 표지의 Yeah We draw something beautiful 에서 yeah를 지웠다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 122,
          title:
            "인간이 문화 속에서 식물을 관찰, 해석, 해체, 가공, 전시하는 독특한 양상들을 거울처럼 비추어주기를 기대한다'는 전시의 주제처럼 인간이 식물을 바라보는 관점 그대로를 이미지화하려 했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 123,
          title: "위선이 무서운 건 그 속내를 알 길이 없기 때문이라고 생각했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 124,
          title:
            '작가는 한 인터뷰에서 "전시를 통해 예술은 예술가의 것이 아니라 관람객의 몫이며 예술가조차 변화한다',
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 125,
          title:
            "2000년대 들어서 창작자와 예술 분야 종사자를 중심으로 자신의 작업을 인쇄물로 구현할 수 있는 개성 있는 수단으로 자리매김한 리소 인쇄를 학교 후배들에게 알려주기 위한 브로슈어를 제작하였습니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 126,
          title:
            "아이웨어 브랜드 젠틀몬스터Gentlemonster의 브랜드필름: 낙원은 우리가 가보지 못한 곳, 가보고 싶은 곳이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 127,
          title:
            'Dir/Animation, Illustration: Im Hayoung Music: "S\'Rothe-Zauerli" Ose Schuppel',
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 128,
          title:
            " 사물들이 이미지화되고, 매체에 따라 다르게 출력되는 이미지를 관찰하는 작업",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 129,
          title:
            "마리와 그녀의 절친한 친구이자 게이인 프랑시스는 파티에서 만난 새로운 친구인 니콜라를 동시에 좋아하게 된다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 130,
          title: "구워지는 쿠키의 이미지를 테마로 하는 태닝 제품 브랜드입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 131,
          title: "인형으로 고어를 카와이하게 표현한 고어영화제",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 132,
          title:
            "기존 포스터에서는 기독교를 연상시키는 십자가나 예수의 형상, 빛 같은 이미지들로 포스터를 구성했는데, 난 개강예배에서 다루는 성경말씀에 집중했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 133,
          title:
            "주인공의 분노가 커질 때마다 그에 대한 억압도 같이 커지므로 불기둥의 크기도 점차 커지게된다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 134,
          title:
            "<The Way Things Go>라는 제목의 링크를 타고 들어가니 미리 설치해놓은 장치들에 연쇄작용이 일어나는 영상이 재생되었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 135,
          title:
            "DREAM = LOTTO 1 포스터는 로또기계를 배경으로 DREAM을 위에 올린 후 이도 불명확하게 하기위해 철자를 중간에 지웠다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 136,
          title: "그림책 시리즈 『양육의 방』의 첫 번째 이야기입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 137,
          title: "낮잠카페 the third rabbit hole의 브랜드 디자인 입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 138,
          title:
            "한 챕터 별로 한 인물의 대사들만 뽑아 채팅창에 한 문장씩 입력한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 139,
          title: "대한민국의 지역 캐릭터를 모아 책으로 엮었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 140,
          title:
            "검열'이란 키워드로 시작해 전두환 정권 당시 광주에서 벌어진 5.18사건, 그 잔혹함에 무참히 살해당한 피해자들의 모습을 아트지에 담고 86서울 아시안게임, 88서울 올림픽의 밝고 평화적인 모습을 기름종이에 인쇄해 아트지를 검열했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 141,
          title: "암울한 현재, 그리고 그것보다 더 암울한 미래",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 142,
          title:
            "참여자들은 캔버스가 띄워진 여러 대의 컴퓨터로 그림을 그린다. 모두가 즉흥적으로 참여해 만들어내는 결과물은, 그들이 결과물을 이루는 하나하나의 개성이라는 것을 느끼게 한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 143,
          title:
            "러브레터라는 영화가 주는 인상을 기존의 어지럽고 시끄러운 리플렛과는 다르게 그래픽 요소 없이 사진과 텍스트의 배치만을 이용해서 전달하는게 목적이었습니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 144,
          title:
            "밤이 아름다운 도시, 통통 튀는 트렌디한 도시의 이미지를 가진 도쿄를 연상시킬 수 있도록 디자인하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 145,
          title:
            "서울 올림픽(1988)과 관련된 건축물 3가지를 선정하여 포스터를 제작하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 146,
          title:
            "Zara Larsson의 <Lush Life> 곡을 주제로 그래픽 엽서카드를 제작하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 147,
          title:
            "할로윈 컨셉의 착시현상, 착시효과에 대한 그래픽을 관람하고 즐기는 착시파티를 기획하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 148,
          title: "시각적으로 강박증을 잘 나타낼 수 있는 그래픽을 제작하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 149,
          title:
            "요정 나이아드들이 살고 있는 수도관으로만 이루어진 물의 도시- ‘아르밀라’ 라는 도시를 선택하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 150,
          title:
            "뒤죽박죽 무질서에 어울리는 소재로 ‘공터’를 떠올렸고, 사진을 촬영하여 배치한 후, 활자를 올렸다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 151,
          title:
            "랜섬노트란 발신자의 정체를 숨기기 위해 글자를 변형하고 뒤죽박죽으로 배치하여 쓰던 편지형식의 스타일로, 지난번 작업에서 발전시켜 랜섬 노트의 유래와 목적에 대해 탐구하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 152,
          title:
            "올랜도 사건 이후, 전세계적 으로 성소수자 차별 반대와 성소수자 인권 확립을 위한 운동이 일어났고, 페인팅을 통해 그들의 목소리와 메시지를 대신하기도 하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 153,
          title:
            "기록의 정보는 대선 결과와 과정에 대한 기록이며, 기억의 정보는 대선이 전해주는 또 다른 의미에 대한 것을 말한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 154,
          title:
            "건국대학교 예술디자인대학의 피난 안내도를 보고, 보다 효과적인 비주얼이 필요하다고 생각하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 155,
          title:
            "요즘 영화 티켓은 영수증 겸용 티켓으로, 미적으로나 질적으로나 개선할 필요가 많다고 느꼈다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 156,
          title:
            "외계 사회와 지구의 소통을 위한 도구로 크롭서클을 사용하게 된다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 157,
          title: "과자 분석 어플 스낵픽",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 158,
          title: "현재 날씨를 분석하여 귀여운 그래픽으로 보여주는 어플",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 159,
          title: "태국 과일비누 브랜드인 Sobia의 패키지를 리디자인하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 160,
          title:
            "“연금술사 플라멜의 가방 속에는 어떤 것들이 있을까?” 은을 금으로 제조하는데 성공한 고대 연금술사 ‘플라멜’의 가방을 컨셉으로 패키지를 디자인하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 161,
          title:
            "노출 콘크리트, 물과 빛의 마술사 건축가 안도 다다오의 명함을 만들었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 162,
          title:
            "건축가 안도 다다오의 가상의 건축 전시회 <빛과 물의 작용> 포스터를 제작하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 163,
          title:
            "드뷔시의 음악을 좋아하는 사람들을 위한 피아노 선곡집을 리디자인하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 164,
          title: "도시 속 먼지 컨셉의 게임이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 165,
          title:
            "CINEMA 4D를 이용하여 3D 집을 제작하고, 애니메이션 모션을 추가하여 영상으로 만들었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 166,
          title:
            "SF작가 레이 브래드버리의 단편 소설 <Embroidery>의 줄거리를 모티브로 기존 텍스트를 재편집한 과제",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 167,
          title: "웹툰에서 계절을 알려주는 풍경을 모은 책이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 168,
          title: "처음부터 끝까지 모든 컷이 남성의 엉덩이로만 이뤄진다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 169,
          title: "don't build castles in the air",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 170,
          title:
            "꿈을 좋은 꿈, 나쁜 꿈으로만 판단하는 잘못된 방법으로가 아닌, 자신의 꿈을 통해 무의식이 의도하는 바를 읽어냄으로서 좀 더 성숙한 “자기(self)”를 이루어야 한다고 생각한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 171,
          title: "‘백석 시축제’는 시인들의 축제입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 172,
          title: "The Picture of Dorian Gray",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 173,
          title:
            "일정한 방식으로 나열하여도 그 방식이 겹쳐지지 않도록 만들어졌다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 174,
          title:
            "허구의 세계 속 가축으로 도축당하는 동물(터킨)과 친분을 쌓는 도축업자의 아이",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 175,
          title:
            "주로 디자인 관련, 그외의 흥미로운 서적 번역, 편집, 출판하는 소규모 출판업체 브랜딩",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 176,
          title: "선형대수학 문제들을 즐겁게 푸는 소규모 축제",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 177,
          title: "트리맵의 역사와 사용 사례 등을 조사했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 178,
          title:
            "판형은 글자가 놓이는 공간으로 텍스트의 높이 혹은 너비를 측정하는 도구로 기능한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 179,
          title:
            "한창 병아리같을 나이에 마음속의 병앓이를 키우는 아이들의 토크 콘서트",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 180,
          title:
            "서울에 위치한 모텔 중 외래어를 사용한 모텔을 대상으로 책과 포스터를 작업하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 181,
          title:
            "<월리를 찾아라>의 작가 Martin Handford를 주제로 한 포스터 작업",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 182,
          title:
            "1인 가구가 늘어나고, 가족의 해체가 화두로 오르는 현 시대임에도 불구하고, 가족 내의 역할은 전근대의 가부장적 사회와 동일하게 요구된다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 183,
          title:
            "이 작업은 물건의 본래 용도와 관계없이 존재만으로 완벽한 것이 있다는 생각에서 출발하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 184,
          title:
            "고전의 명화들과 클래식 음악에서 영감을 받아 그래픽 디자이너가 재해석한 신화를 표현해보았다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 185,
          title:
            "조합형 서체의 ‘벌수’를 이해하기 위해, 윤동주의 <별 헤는밤> 전문을 파생하고 조판하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 186,
          title: "소리의 시각화 작업 첫번째 아이디어 스케치",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 187,
          title: "연사들의 스피치를 듣고 그래픽 에세이로 표현",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 188,
          title: "연사들의 스피치를 듣고 그래픽 에세이로 표현 (2)",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 189,
          title: "연사들의 스피치를 듣고 그래픽 에세이로 표현 (3)",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 190,
          title: "연사들의 스피치를 듣고 그래픽 에세이로 표현 (4)",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 191,
          title: "연사들의 스피치를 듣고 그래픽 에세이로 표현 (5)",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 192,
          title:
            "3차원의 타입페이스가 가진 면들을 왜곡하고 부풀리며 때로는 수축시켜 그 타입페이스가 점유할 수 있는 공간을 상상한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 193,
          title:
            "그래픽 디자인사를 한눈에 보이게 하고자 포스터를 매체로 삼게 되었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 194,
          title:
            "진정한 공존의 시대를 맞이한 판타스틱 플래닛이 꿈꾸는 미래가 바로 'NEW EYES'에 담겨있다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 195,
          title:
            "초안을 제작하여 상호 피드백을 하였을때 망사 스타킹이나 립스틱을 오브제 로 사용하는것이 어떻겠느냐는 피드백을 많이 받았는데 요, 그럼에도 불구하고 섹시함의 책을 표현하는데 여성 과 관련된 소품을 사용하지 않으려 한것은 섹시함이라 는 단어는 여성에게 국한되지 않기 때문입니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 196,
          title: "두려움의 책은 종이의 질감을 특히 신경을 많이 썼습니다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 200,
          title: "Pseudo-Random Number Generator   의사 난수 생성 프로그램",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 201,
          title:
            "패턴 장식으로 활용할 수 있는 딩벳(dingbat) 세트를 디자인하고, 표지와 내지에 활용했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 202,
          title:
            "원도를 그리고 벡터화시키는 작업을 각 도구 별로 3주씩 진행했고, 마지막 2주 동안에는 자유롭게 도구를 선정하고 레터링작업을 진행했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 203,
          title: "아가사 크리스티의 단편소설 검은 고양이를 디자인했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 204,
          title:
            "디스토피아 세계관을 가진 작품들을 전시하는 전시회를 브랜딩했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 205,
          title: "심야시간에 운영하는 갤러리를 브랜딩했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 206,
          title:
            "태양주위를 도는 행성들의 궤도를 바탕으로 그리드를 제작하여 폰트를 제작했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 207,
          title:
            "작업물과 작업물에 직접적으로 영향을 미쳤거나 비슷한 특징들을 공유하는 다양한 자료들을 소개하는 설명책을 만들고 움직임이 두드러지는 자료들을 많이 사용하였기 때문에 이를 잘 담아낼 수 있도록 각 자료들을 한권씩 플립북으로 제작하였다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 208,
          title: "소다소다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 209,
          title: "메인페이지에는 작업의 실루엣들이 불규칙적으로 나열되어있다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 210,
          title: "우리는 특별하다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 211,
          title: "가운데 ‘g’를 물음표의 모양처럼 만들었다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 212,
          title: "‘in’을 글자 안에 가두어 단어의 뜻을 나타냈다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 213,
          title:
            "일상 속 흔한 소재 안의 ‘사라진 것들’을 찾아 그에 대해 탐구하고 의미를 재해석하여 그래픽과 타이포그래피로 풀어낸 가상의 전시",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 214,
          title:
            "각 계명에 해당되는 내용을 인간의 신체기관과 연관지어 차트의 형식으로 소책자를 제작했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 215,
          title:
            "몰락의 에티카’에 언급되었던 세 권의 장편소설을 엮어낸 총서 커버 디자인이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 216,
          title:
            "도식화된 심볼 형태의 플라스크와 하단부가 italic체로 조합된 형상의 서체로 실험적인 인상을 유도하는 복합문화공간의 아이덴티티 디자인이다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 217,
          title: "Culture",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        { num: 218, title: "IM", color: ["#FEFEFD", "#DBDADA", "#B5B4B5"] },
        {
          num: 219,
          title:
            "새로운 푸투라(미래)를 기준으로 한 시제씩 내려오면서 슬랍-세리프, 세리프를 차례로 더해 프리젠타(현재)와 패스트라(과거)라는 서체를 디자인했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 220,
          title: "급하게 책을 읽을 것 같다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 221,
          title:
            "책 읽는 규칙을 이상하게 만들어보자는 생각으로, 책 넘기는 방향이 자유로우며 한 번에 여러 페이지를 함께 읽을 수 있는 책을 디자인했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 222,
          title: "개별 글자들은 몇 자씩 묶여서 같은 소리 스펙트럼에 반응한다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        },
        {
          num: 223,
          title:
            "<타입과 미디어>는 글자의 형태적, 이미지적 가능성을 충분히 탐구하는 것을 목표로 했다",
          color: ["#FEFEFD", "#DBDADA", "#B5B4B5"]
        }
      ];
    },
    zhtx: function(t, e) {},
    zy6Z: function(t, e) {}
  },
  ["NHnr"]
);
//# sourceMappingURL=app.61ef26307a26f157896c.js.map
