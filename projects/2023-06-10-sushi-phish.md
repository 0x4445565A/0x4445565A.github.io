---
title: Sushi Phish Tool Retro
permalink: /projects/{{year}}/{{slug}}
data:
    img: /assets/posts/img/sushi.png
    summary: A tool used to detect potential phishing domains.
    tags: Go, security
    hide: false
published_date: 2023-06-10 02:51:19.802109062 +0000
layout: post.liquid
is_draft: false
---
# Sushi Phish Scrapper

In 2016 a security research known as ExecuteMalware documented their process on how they discover new phishing domains.  That old blog post can be read [here](https://web.archive.org/web/20170822061820/http://executemalware.com/?p=258).  The short of it is you can download a snapshot of the recently registered domain names from a service like [dnpedia](https://dnpedia.com/tlds/daily.php) and from there you can parse out domains of suspicious keywords.

At this time I was in the early stages of learning Go, so I decided to write a quick program that lets me ingest these domains and search for hot keywords.  In retrospec that program is far from efficient and there are many things I would do differently.  However I am more interested in documenting the historical aspects of this project as different parts get lost to time.

The project can still be viewed on [github.com/0x4445565A/sushiphish](https://github.com/0x4445565A/sushiphish)
<img src="/assets/posts/sushi-usage.png">


## Why it's bad

Looking at the code itself for a learning project it isn't too egregious(I'm being kind to past Brandon), however it fails to meets the goals of the tool.


### Missing Headless Mode
I set out to create a tool that ideally would have mix modes, a headless quiet mode and an interactive mode.  Looking out how I structured the arguments its very clear the headless mode is not present, which is arguably the more important feature.  If I am trying to discover 1000s of phishing domains the tool should ideally collect the domains and create an output.  This output should then be able to feed back into the program in a managed mode at a later time.

```golang
// https://github.com/0x4445565A/sushiphish/blob/master/sushiphish.go#LL162C1-L169C27
if len(os.Args) < 3 {
    fmt.Printf("Usage: %s input.txt out.csv\n", os.Args[0])
    fmt.Printf("Optional: %s input.txt out.csv hotword1 hotword2 ... hotwordN\n", os.Args[0])
    return
}

inputFileName := os.Args[1]
csvFileName := os.Args[2]
```

### No fuzzy matching
The program has some default arguments that can be passed in.  Things like paypal, apple, amazon, etc but this is not sufficient.  The suspicion check is very naive, it essentially matches `*HOTWORD*`.  This means people sitting on [bitsquatting](https://web.archive.org/web/20180713212603/http://media.blackhat.com/bh-us-11/Dinaburg/BH_US_11_Dinaburg_Bitsquatting_WP.pdf) or domains with similar characters are being left out.

If I were to rewrite this I would want to add regular expression support along side a flag for checking bit flip matches and similar character replacement.  For example in similar characters `instagram => lnstagrarn` where `l` looks like `i` and `r n` looks like `m`.  In bitsquatting `instagram => knstagram` because `i => 0b01101001` and if the 2nd bit was flipped the `i` would be a `k`.  Ideally this would be behind a feature flag and would let non-regex hot words trigger on these mangle rules.

```golang
func isSuspicious(d string) bool {
	d = strings.ToLower(d)
	for _, h := range hotList {
		if strings.Contains(d, h) {
			return true
		}
	}
	return false
}
```

### The Rest
Ultimately the tool is okay, it does a job but it doesn't take advantage of any of the features that make golang so special.  It is no more complex than a bash script.  It would have been nice if it also sourced the CSV, had better documentation for file expectations, and a more cohesive usage banner.

What even is this...
```golang
c = len(checkList)  // Yuck
fmt.Printf("Analysing %d domain(s)...\n", c)
fmt.Println("Starting manual site inspection...")
for k, v := range checkList {  
    checkList = processDomain(k, v, checkList)  // This is the goofiest thing
}
c = len(checkList)  // Yuck
fmt.Printf("Exporting %d bad domains to CSV...\n", c)
```

## Retro
This tool is bad, but I shouldn't feel bad for that.  It was a small project to learn and explore a language that I eventually launched into a successful career.  I have learned a lot and looking through this project 7 years later is a blast from the past and I'm happy to recognize how much I have grown as an engineer.

To the reader I ask when was the last time you ripped apart an old project?  It could be fun.