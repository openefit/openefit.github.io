---
layout: post
title: autohotkey 
description: autokey configuration
tags: [dvorak,autohotkey,notes]
image: 
  background: triangular.png
comment: true
share: true
---

autohotkey configuration

dvorak+emacs


{% highlight autohotkey %} 
#z::Run www.autohotkey.com

^!n::
IfWinExist Untitled - Notepad
	WinActivate
else
	Run Notepad
return

{% endhighlight %}

<!--more-->

{% highlight autohotkey %} 
; Note: From now on whenever you run AutoHotkey directly, this script
; will be loaded.  So feel free to customize it to suit your needs.

; Please read the QUICK-START TUTORIAL near the top of the help file.
; It explains how to perform common automation tasks such as sending
; keystrokes and mouse clicks.  It also explains more about hotkeys.



s::o
d::e
f::u
g::i
h::d
j::h
k::t
l::n
`;::s
'::-
z::`;
x::q
c::j
v::k
b::x
n::b
,::w
.::v
/::z
q::'
w::,
e::.
r::p
t::y
y::f
u::g
i::c
o::r
p::l
[::/
]::=
-::[
=::]




#IfWinNotActive,emacs
^l::Send {Down Down}
^r::Send {Up Down}
^n::Send {Left Down}
^d::Send {End Down}
^a::Send {Home Down}
!.::Send {PgUp Down}
^h::Send {Del Down}
^u::Send {Esc}

;; The following are conflicted with the 
;; default Windows' style
^y::Send {Right Down} ; Default ^f is search, it's replace by ^s
^.::Send {PgDn Down}

^t::
if WinActive("ahk_class MozillaUIWindowClass")
        Send ^t
else
        Send ^.
return

!,::
if WinActive("ahk_class MozillaUIWindowClass")
        Send !,
else
        Send ^i
return

^;:: ; Deault ^s is save, now replace by !s
if WinActive("ahk_class MozillaUIWindowClass")
        Send ^;
else
        Send ^y
return

!;::
if WinActive("ahk_class MozillaUIWindowClass")
        Send !;
else
        Send ^;
return

^,::
if WinActive("ahk_class MozillaUIWindowClass")
        Send ^,
else
        Send ^b
return

{% endhighlight %} 

