/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

qx.Class.define("demobrowser.demo.ui.HBoxLayout_1",
{
  extend : demobrowser.Demo,

  members :
  {
    main: function()
    {
      this.base(arguments);

      doc = new qx.ui.root.Application(document);

      doc.setTextColor("black");
      doc.setBackgroundColor("white");

      var border = new qx.ui.decoration.Basic(1, "solid", "black");


      // auto size
      var box1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "yellow"});
      var layout1 = new qx.ui.layout.HBox();

      layout1.setSpacing(5);
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      box1.setLayout(layout1);
      doc.add(box1, 10, 10);

      // container higher, vertical alignment
      var box1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "yellow", minHeight: 60});
      var layout1 = new qx.ui.layout.HBox();

      layout1.setSpacing(5);
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green", maxHeight: 40}), { align : "top" });
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green", maxHeight: 40}), { align : "middle" });
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green", maxHeight: 40}), { align : "bottom" });
      box1.setLayout(layout1);
      doc.add(box1, 10, 70);


      // container wider, horizontal alignment = right
      var box1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "yellow", width: 500});
      var layout1 = new qx.ui.layout.HBox();

      layout1.setSpacing(5);
      layout1.setAlign("right");
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      box1.setLayout(layout1);
      doc.add(box1, 10, 140);


      // container wider, horizontal alignment = center
      var box1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "yellow", width: 500});
      var layout1 = new qx.ui.layout.HBox();

      layout1.setSpacing(5);
      layout1.setAlign("center");
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      layout1.add((new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"}));
      box1.setLayout(layout1);
      doc.add(box1, 10, 200);



      // auto size + horizontal margins
      var box1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "yellow"});
      var layout1 = new qx.ui.layout.HBox();

      layout1.setSpacing(5);
      var w1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})
      var w2 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})
      var w3 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})

      layout1.add(w1, { marginRight : 10 });
      layout1.add(w2, { marginLeft : 20, marginRight : 10 });
      layout1.add(w3, { marginRight : 10 });

      box1.setLayout(layout1);
      doc.add(box1, 10, 260);



      // manual width + horizontal margins + alignment=right
      var box1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "yellow", width: 500});
      var layout1 = new qx.ui.layout.HBox();

      layout1.setSpacing(5);
      layout1.setAlign("right");

      var w1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})
      var w2 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})
      var w3 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})

      layout1.add(w1, { marginRight : 10 });
      layout1.add(w2, { marginLeft : 20, marginRight : 10 });
      layout1.add(w3, { marginRight : 10 });

      box1.setLayout(layout1);
      doc.add(box1, 10, 320);



      // manual width + horizontal margins + alignment=center
      var box1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "yellow", width: 500});
      var layout1 = new qx.ui.layout.HBox();

      layout1.setSpacing(5);
      layout1.setAlign("center");

      var w1 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})
      var w2 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})
      var w3 = (new qx.ui.core.Widget).set({decorator: border, backgroundColor: "green"})

      layout1.add(w1, { marginRight : 10 });
      layout1.add(w2, { marginLeft : 20, marginRight : 10 });
      layout1.add(w3, { marginRight : 10 });

      box1.setLayout(layout1);
      doc.add(box1, 10, 380);
    }
  }
});
