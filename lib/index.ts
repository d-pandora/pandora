#!/usr/bin/env node
import commander from 'commander'

import './fragement'
import './init'

function help () {
  commander.parse(process.argv)
  if (commander.args.length < 1 || typeof commander.args[0] === 'string') {
    return commander.help()
  }
}

help()
