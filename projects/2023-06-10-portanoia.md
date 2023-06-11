---
title: Portanoia Retro
permalink: /projects/{{year}}/{{slug}}
data:
    img: /assets/posts/img/portanoia.png
    summary: A retro on a tool to detect covert port scanners.
    tags: Go, security
    hide: false
published_date: 2023-06-10 19:01:19.802109062 +0000
layout: post.liquid
is_draft: false
---
# // Portanoia Retrospective
In late 2016 I was experimenting with creating defensive security tools and I had a big interest in working with raw packets.  As a result I dreamt up the concept for [portanoia](https://github.com/0x4445565A/portanoia), originally it was written in python but for the learning experience I recreated a more robust version in go.

The idea behind the project is simple.  Create a port and if the port gets any traffic report the connection to the user so an action can be taken.  The most common action being to push the `src` IP into iptables and block it.  The project itself was written haphazardly over the course of a week.  It was an arms race against myself.  I wrote the honeypot port.  Then I would scan it, watch it work, and keep changing [nmap](https://nmap.org/) flags until my honeypot couldn't detect the scan but the scan.

I learned a lot about raw packets, go routines, TCP/UDP raw sockets, and nmap.  Originally it was just a normal TCP socket, but pretty quickly I realized with scans like [TCP FIN, NULL, and Xmas](https://nmap.org/book/scan-methods-null-fin-xmas-scan.html) that my tool can be bypassed.  Nmap essentially half connects to a port just long enough in the handshake to see a connection start, but then it quickly aborts.  Golang's [TCP socket](https://pkg.go.dev/net#TCPConn) requires a full connection to be established before the connection is made available to the software.  To get around this I implement go's wonderful raw socket module.

By the end of the week it was very difficult to get my hyper sensitive [portanoia](https://github.com/0x4445565A/portanoia) program to not respond to any packet meant for my service.  Overall a pretty solid success.

<img src="/assets/posts/portanoia-usage.png">

## Did It Work?
It actual work really well, still does, and it's pretty fast too.  However, I don't know if I agree with how I implemented threading.  I didn't do enough testing to make sure the raw packet returning packets back out of order wouldn't cause network issues for the device, honestly a naive consideration I didn't even make.  I just wanted to go fast.

There was one major vulnerability though.  In theory the attacker could use [nmaps IP spoofing](https://nmap.org/book/man-bypass-firewalls-ids.html) to change the IP to something that would make your computer block or counter attack an IP address that isn't the actual attacker.  Of course the attacker would need to know you're running [portanoia](https://github.com/0x4445565A/portanoia), but obscurity isn't a valid excuse.

## What Would I Change?
Honestly its a solid attempt for a CLI tool.  I would make a better separation of concerns UI module, packet handler, go routine manager, etc.  It's currently all in one file and I would much prefer that I made a library and then a frontend for it.  This would make it easier to maintain/change parts out.  This is a practice I do more often but I did not consider in 2016.

Additionally, I would also have better built in support for the action response.  Maybe running modules that can validate the source address, or at the very least make sure the action wont be taken against yourself or the router.

## Retrospective
Overall I am fairly pleased with the project.  If I were to rewrite it I would organize better, validate the source IP, and make it easier to maintain.  A very solid project to revisit.
