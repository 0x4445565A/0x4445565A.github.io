---
permalink: /projects/{{year}}/{{slug}}
title: From Go to Rust
published_date: 2023-06-17 04:05:45.438136836 +0000
layout: post.liquid
is_draft: false
data:
  hide: false
  tags: Rust, Go
  summary: An ongoing journey about learning rust.
  img: assets/posts/img/golang-rust.png
---
# From Go To Rust (Work In Progress)
I'm a long time gopher trying to become a rustacean.  This article is an attempt to document the patterns I learn, differences I spot, and maybe to compare an idiom or two.  This is mainly for my own reference but if the odd rust newbie stumbles upon this article, hello and welcome!

## Why Move From Golang?
I started learning Golang as a replacement for PHP more than 7 years ago.  The language has treated me well through years of professional and personal projects.  I chose Golang because I always enjoyed coding at a lower level, I thought that as Golang matured it would create more interesting opportunities.  This has proved to not be the case given that most companies leverage Go for APIs.  As exiting as high availability APIs sourced through Airflow ETLs are, it's hard to be passionate about refactoring the same projects over and over for almost a decade across several companies.

## Why Rust?
Rust has been on my radar since 2020, and every time I hear of a new milestone it piques my interest even more.  Over the last few years here are some of the articles that have attracted me to rust.  Here is a quick example of some of the recent achievements rust has accomplished.  In addition to this, it's exciting working in a language that can write APIs, kernels, logic for micro controllers, video games, and just about everything else you can write in C without all the memory issues.
<ul>
<li><a href="https://web.archive.org/web/20230424154127/https://thenewstack.io/rust-in-the-linux-kernel/" target="_blank" rel="noopener noreferrer nofollow">Rust in the Linux kernel</a></li>
<li><a href="https://web.archive.org/web/20230129032305/https://programming-language-benchmarks.vercel.app/go-vs-rust" target="_blank" rel="noopener noreferrer nofollow">Go vs Rust Benchmark</a></li>
<li><a href="https://web.archive.org/web/20221230200053/https://doc.rust-lang.org/edition-guide/rust-2021/index.html" target="_blank" rel="noopener noreferrer nofollow">Rust 2021 Edition Released</a></li>
<li><a href="https://web.archive.org/web/20230527072850/https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/" target="_blank" rel="noopener noreferrer nofollow">Rust MIT Review</a></li>
<li><a href="https://web.archive.org/web/20230611104859/https://discord.com/blog/why-discord-is-switching-from-go-to-rust" target="_blank" rel="noopener noreferrer nofollow">Discord Switches to Rust</a></li>
</ul>

<br>
<hr>

# Idioms
Here are some idiom examples for Go and Rust

## Recoverable Error Handling
In [Rust error handling](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html) we use `Result<T, E>`.  Rust additionally allows the `?` operator as seen [here](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator) to pass the error up stream instead of needing boiler plate.
```
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };
}
```

In [Golang error handling](https://go.dev/blog/error-handling-and-go) we use the error type to detect errors and then handle them.  Golang additionally allows single line error check `if err := foo(); err != nil { // Do something }`, but it doesn't save much boiler plate.
```
func main() {
  f, err := os.Open("hello.txt")
  if err != nil {
      log.Fatal(err)
  }
}
```
<br>

## Ignoring Errors
In [Rust](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#shortcuts-for-panic-on-error-unwrap-and-expect) we can gracefully ignore errors in two ways.  The first is with `unwrap()` where the error is ignored and we assume it's safe.  Ideally you will want to use `expect()` so if you do have a panic you can at least describe the panic.
```
use std::fs::File;

fn main() {
    // Unwrap method panics on error, ungraceful
    let greeting_file = File::open("hello.txt").unwrap();

    // Expect method panics on error, but a little more gracefully
    let greeting_file = File::open("hello.txt")
        .expect("hello.txt should be included in this project");
}
```

In [Golang](https://go.dev/blog/error-handling-and-go) we can _"gracefully"_ ignore errors as well.  This is done by either not assigning the `err` variable or assigning the `error` response to `_`.  However this will allow the program to continue and introduce unexpected behaviors.  It is also easy to miss capturing errors by functions that only return a single `error` in their response.
```
func main() {
  f, _ := os.Open("hello.txt")
}
```
<br>
<hr>
<img src="/assets/posts/golang-to-rust-animorphs.png" alt="An animorphs book cover of the go gopher turning into the rust rustacean">