//
// Autogenerated by Thrift Compiler (0.12.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./hellos_types');
//HELPER FUNCTIONS AND STRUCTURES

var DmsThriftServer_heartBeatConn_args = function(args) {
  this.connId = null;
  if (args) {
    if (args.connId !== undefined && args.connId !== null) {
      this.connId = args.connId;
    }
  }
};
DmsThriftServer_heartBeatConn_args.prototype = {};
DmsThriftServer_heartBeatConn_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.connId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

DmsThriftServer_heartBeatConn_args.prototype.write = function(output) {
  output.writeStructBegin('DmsThriftServer_heartBeatConn_args');
  if (this.connId !== null && this.connId !== undefined) {
    output.writeFieldBegin('connId', Thrift.Type.I32, 1);
    output.writeI32(this.connId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var DmsThriftServer_heartBeatConn_result = function(args) {
};
DmsThriftServer_heartBeatConn_result.prototype = {};
DmsThriftServer_heartBeatConn_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

DmsThriftServer_heartBeatConn_result.prototype.write = function(output) {
  output.writeStructBegin('DmsThriftServer_heartBeatConn_result');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var DmsThriftServerClient = exports.Client = function(output, pClass) {
  this.output = output;
  this.pClass = pClass;
  this._seqid = 0;
  this._reqs = {};
};
DmsThriftServerClient.prototype = {};
DmsThriftServerClient.prototype.seqid = function() { return this._seqid; };
DmsThriftServerClient.prototype.new_seqid = function() { return this._seqid += 1; };

DmsThriftServerClient.prototype.heartBeatConn = function(connId, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_heartBeatConn(connId);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_heartBeatConn(connId);
  }
};

DmsThriftServerClient.prototype.send_heartBeatConn = function(connId) {
  var output = new this.pClass(this.output);
  var params = {
    connId: connId
  };
  var args = new DmsThriftServer_heartBeatConn_args(params);
  try {
    output.writeMessageBegin('heartBeatConn', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

DmsThriftServerClient.prototype.recv_heartBeatConn = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new DmsThriftServer_heartBeatConn_result();
  result.read(input);
  input.readMessageEnd();

  callback(null);
};
var DmsThriftServerProcessor = exports.Processor = function(handler) {
  this._handler = handler;
};
DmsThriftServerProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
};
DmsThriftServerProcessor.prototype.process_heartBeatConn = function(seqid, input, output) {
  var args = new DmsThriftServer_heartBeatConn_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.heartBeatConn.length === 1) {
    Q.fcall(this._handler.heartBeatConn.bind(this._handler),
      args.connId
    ).then(function(result) {
      var result_obj = new DmsThriftServer_heartBeatConn_result({success: result});
      output.writeMessageBegin("heartBeatConn", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
      output.writeMessageBegin("heartBeatConn", Thrift.MessageType.EXCEPTION, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.heartBeatConn(args.connId, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new DmsThriftServer_heartBeatConn_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("heartBeatConn", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("heartBeatConn", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
