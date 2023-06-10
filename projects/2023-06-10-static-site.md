---
title: Moved to Cobalt
data:
    img: /assets/posts/img/static.png
    summary: Kill the static site, long live the static site!
    tags: Rust, HTML, CSS, Liquid
    hide: false
published_date: 2023-06-10 02:51:12.652100849 +0000
layout: post.liquid
is_draft: false
---
# Static Sites and Over Engineering

As I was looking at my portfolio website [iBreak.Systems](https://ibreak.systems), I realized I was a little bored with the tech that was running it.  The site used to run on a custom, semi-static, CMS I wrote.  I wrote the semi-static CMS years ago when I still thought I had any interest in frontend engineering of any kind.  That has not been the case for 7 years, unless I'm backend² I'm not happy.

Recently starting my most recent journey into [Rust](https://www.rust-lang.org/) I decided that should prepare to write more articles and do more projects.  This forced me to update the articles in my undocumented Angular CMS that is over half a decade old.  After taking a brief look into the editor I realized I really didn't want to do this and I would much I would rather migrate to a proper static site generator.  Bring in [Cobalt](https://cobalt-org.github.io/).

[Cobalt](https://cobalt-org.github.io/) is a bare bones static site generator written in Rust.  The templates are managed in [Liquid](https://shopify.github.io/liquid/), a template language created by shopify.  After spending an hour with Cobalt and Lquid I was off the races dusting off my ancient CSS skills, learned about some new-to-me tech like `flexbox` and `has()`, and got to writing.

Needless to say this project post is a long winded Hello World!  If you would like to follow more on this project check out the [repo here](https://github.com/0x4445565A/0x4445565A.github.io).
