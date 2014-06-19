#WAI-ARIA Stylesheet

This is an attempt to create a stylesheet that approximates how a web page is perecived by a screen reader, taking into account WAI-ARIA roles.

So far I've implemented grids and it works pretty well in browsers that support CSS3. We'll probably need to add JavaScript to remove nodes that have role="presentation" because there's no way in CSS to say "this doesn't affect layout whatsoever".



