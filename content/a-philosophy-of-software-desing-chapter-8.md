# A philosophy of Software Design - Chapter 8 - Pull Complexity Downwards

It is more important for a module to have a simple interface than a simple implementation. Reason: most modules have more users than developers, so it's better for the latter to suffer.

If there is some sort of unavoidable complexity, it's better to to hide it from the interface, i.e. pull it downwards.

Configuration parameters are an example of movin complexity upwards: Instead of dealing with a complicated issue internally, the class passes this responsiblity on to the caller.

One should only pull complexity into a class or module that is directly related to this class or module in order to not introduce knowledge into it that should live in another domain.

> When developing a module, look for opportunities to take a little bit of extra suffering upon yourself in order to reduce the suffering of your users.
