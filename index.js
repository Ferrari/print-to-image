#!/usr/bin/env node

'use strict'

const path = require('path')
const fs = require('fs')
const gm = require('gm').subClass({imageMagick: true})
const argv = require('minimist')(process.argv.slice(2))

const Printer = require('ipp-printer')
let printer = new Printer('print-to-image')

printer.on('job', function(job) {
  let filetype = argv.t || 'jpg'
  let filename = `job-${job.id}.${String(filetype).toLowerCase()}`
  let target = argv.d || __dirname

  job.on('end', function() {
    console.log('Print job complete!')
  })

  gm(job, filename)
  .res({bufferStream: true}, function(err, value) {
    if (err) {
      console.error(err)
    } else {
      console.log(`resolution: ${value}`)
      let tmp = value.split('x')
      let res = { width:0, height: 0 }
      if (argv.r) {
        let times = ~~argv.r
        res.width = times * ~~tmp[0]
        res.height = times * ~~tmp[1]
      } else {
        res.width = ~~tmp[0]
        res.height = ~~tmp[1]
      }
      this.density(res.width, res.height)
      this.write(path.join(target, filename), function(err) {
        if (err) {
          console.error(err)
        } else {
          console.log(`[job ${job.id}] document saved as ${target}/${filename}`)
        }
      })
    }
  })
})
