---
permalink: /projects/{{year}}/{{slug}}
title: Compression Tool
published_date: 2023-06-18 21:14:45.438136836 +0000
layout: post.liquid
is_draft: false
data:
  hide: false
  tags: Rust, Compression
  summary: A simple CLI tool to strain my rust knowledge.
  img: assets/posts/img/compress.png
---
# Compression Tool Mental Stress Test
-- See project <a href="https://github.com/0x4445565A/compress" target="_blank" rel="noopener noreferrer nofollow">here</a>

Whenever I learn a new language I will read and watch everything I can on that programming language.  Once the language's syntax is not complete gibberish to me I will give it a test project.  Rust is no different!

I have been working through the analogue version of the [Rust Programming Book](https://doc.rust-lang.org/book/) in addition to some online courses.  I decided it was time for me to stress test my understanding of Rust.

## Order of Operations
I knew how roughly how I wanted to approach the projects iterations.  This was my approach...
  - Compress a string using GZIP
  - Compress STDIN using GZIP
  - Decompress from STDIN using GZIP
  - Add CLI flags to decompress
  - Rewrite to support different compression algorithms
  - Add flags to choose algorithm
  - Add github workflow release pipeline (just for fun)

# Challenges
Given my Rust inexperience I expected to encounter challenges in every step.  This is why my project was created in an iterative process. I ended up with many small problems, which is preferable to a handful of very tough problems.  Larger problems, in my experience, feel like brick walls instead of boundaries to overcome, this is detrimental to any learning experience.

## Using External Crates
This part wasn't too difficult, but in order to get past this I had to navigate using external crates for the first time, digging through examples, and handling basic Rust project configuration.  I imagine that this will get easier the more I build projects.  Overall, an easy and educational wall to get over.

## Learning STDIN
In Golang I am very used to the reader writer interface, I attempted to follow a similar structure in Rust but that strategy had to quickly be abandoned.  Digging into the `Flate2` crate I was able to take advantage of the `examples` directory standard in Rust to get a quick copy and paste example.  In this project I was trying to avoid going to StackOverflow/Rust Communities.

## Clap Crate Confusion
In trying to implement flags I really wanted to avoid using the system args library.  It's boring and a little ugly.  That's when the `Clap` crate came to play.  I was quickly able to add a flag for compressing and decompressing.

## Clap Enums
In preparation of supporting multiple compression types I wanted to add a CLI flag to support algorithms.  I could have just used a string or a number but I decided I was going to be extra cool and dust off `enums`!  I quickly learned that Clap _does_ support enums but it would only be after a fight with traits.  This would be a common theme from this point forward.  In addition to the algorithm selector I also wanted to show the usage help if no STDIN was present.  This resulted in lots of digging into clap.
```
fn main() -> io::Result<()> {
    let args = Args::parse();

    if atty::is(atty::Stream::Stdin) {
        use clap::CommandFactory;
        let mut cmd = Args::command();
        cmd.print_help()?;

        println!("Requires STDIN... Nothing found");
        return Ok(());
    }
    // -- snip --
```
<img src="/assets/posts/compress-usage.png">

## Generic Traits vs Golang Interfaces
This was probably this biggest time sink in this whole project.  It involved reading many articles and hours of experimentation.  At a concept level I understood how to implement this, specifically how I would write it in Golang.  Unfortunately for me this wasn't like Golang and was not like the basic trait examples in Rust.  The project became more difficult because I was trying to add a trait to a foreign struct that already had implemented a different trait that accepted a generic.  This was several layers deeper and more complex than I was ever expecting to run into.  I tried all kinds of different forms (see below).  Finally I landed on the last one.

```
impl Method for GzEncoder
impl Method for GzEncoder<W>
impl Method for GzEncoder<dyn Write>
impl<W: Write> Method<W> for GzEncoder<W>
impl Method for GzEncoder<Vec<u8>>
```

## Borrow Traits and Boxes
Once the trait was finally working I ran into an issue when adding multiple compression types.  This is because I had a `match` that I hoped would return a struct that implemented my trait.  I then wanted to use the returned struct in my STDIN work to compress/decompress, however Rust was very unhappy that the first case returned a `GzEncoder` and the second returned `ZLibEncoder`.  While they both have the `Method` trait they were not the same struct and this was a problem.

```
  pub fn compress(&self) -> impl Method {
      match self {
          Self::GZIP => GzEncoder::new(Vec::new(), Compression::default()),
          // -- Snip --
      }
  }
```

After banging my head against the wall I realized I should use a `Box<dyn Method>` type.  I felt like a genius, I wrote the code at the speed of light.  I have unlocked the final frontier of Rust.  Nothing can stop me!
```
error[E0161]: cannot move a value of type `dyn Method`
```
Clearly I didn't understand `Box` as much as I thought I did.  Digging into this issue I realized you can't pass ownership the value in the `Box` so when I call the internal method `self.finish()` in the trait implementation the compiler becomes unhappy.  To resolve this I refactored my code, I created a default function in the trait.  This allowed me to do all the STDIN work once and not have to worry about passing ownership.  Instead of my `match` returning `Box<dyn Method>` or `impl Method` I just trigger `run()` on the appropriate compression algorithm and get my `Vec<u8>`.  Success!

# Conclusion
This was a solid project that resulted in a pretty cool CLI tool that I might actually use.  The biggest challenge was making my code generic in an attempt to reduce overhead.  With that one requirement I made this project a lot harder than I thought it would be.  I would like to continue to update this project and add tests and remove leaning so hard on STDIN, it would be nicer to allow for different inputs like a file, string, or STDIN.  For now I'm content.