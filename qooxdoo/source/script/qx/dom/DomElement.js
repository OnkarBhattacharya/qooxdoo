/* ************************************************************************

   qooxdoo - the new era of web development

   Copyright:
     2004-2006 by Schlund + Partner AG, Germany
     All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.org

   Authors:
     * Sebastian Werner (wpbasti)
       <sw at schlund dot de>
     * Andreas Ecker (ecker)
       <ae at schlund dot de>

************************************************************************ */

/* ************************************************************************

#module(dom)

************************************************************************ */

qx.OO.defineClass("qx.dom.DomElement");

/*!
  Removes whitespace-only text node children
*/
qx.dom.DomElement.cleanWhitespace = function(vElement)
{
  for (var i=0; i<vElement.childNodes.length; i++)
  {
    var node = vElement.childNodes[i];

    if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
      vElement.removeChild(node);
    }
  }
}

/*!
  Checks if a element has no content
*/
qx.dom.DomElement.isEmpty = function(vElement) {
  return vElement.innerHTML.match(/^\s*$/);
}
