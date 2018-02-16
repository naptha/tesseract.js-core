import os, sys

original = ""
with open(sys.argv[1], 'r') as wumbo:
	original = wumbo.read()

# original = original \
# 	.replace("var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';", "var ENVIRONMENT_IS_NODE = false;") \
# 	.replace("var ENVIRONMENT_IS_WEB = typeof window === 'object';", "var ENVIRONMENT_IS_WEB = true;") \
# 	.replace("var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';", "var ENVIRONMENT_IS_WORKER = false;") \
# 	.replace("!!process.platform.match(/^win/)", "false")

"""
original = original \
	.replace("var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';", "/*ENVIRONMENT_IS_NODE*/;") \
	.replace("var ENVIRONMENT_IS_WEB = typeof window === 'object';", "var ENVIRONMENT_IS_WEB = true;") \
	.replace("var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';", "var ENVIRONMENT_IS_WORKER = false;") \
	.replace("!!process.platform.match(/^win/)", "false") \
	.replace("ENVIRONMENT_IS_NODE", "false")
"""

with open(sys.argv[1], 'w') as again:
	again.write(original)

with open("derp.js", 'w') as again:
	again.write(original)

