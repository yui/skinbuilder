/*
Copyright 2012 Yahoo! Inc. All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// This is the global JSON color space from which all color values are taken.
// The values seen below are defaults and are over-ridden each time the
// user selects a new color

var space = {
    skin: {
        name: 'mine',
        prefix: '.yui3-' //if you change this, you'll need to replace all the prefixes in the markup, including the ones added by the modules
    },
    radius: 10, // global radius in px. This is to be factored as needed by widgets
    padding: 1, // global padding in em. This is to be factored as needed by widgets
    border: {
        width: 1  // global border-width. This is to be factored as needed by widgets
    },

    background: '#FFFFFF',
    gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

    border: {
        high: '#EFEFEF',
        normal: '',
        low: '#C5C5C5'
    },

    text: {
        high: '#252525',
        normal: '#787878',
        low: '#BBBBBB'
    },

    rule: {
        high: '#EEEEEE',
        normal: '',
        low: '#F8F8F8'
    },

    hover: {
        background: '',
        gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',
        border: {
            low: '',
            normal: '',
            high: ''
        },

        text: {
            low: '',
            normal: '',
            high: ''
        },

        rule: {
            low: '',
            normal: '',
            high: ''
        }
    },

    block: {
        low: {
            background: '#fff',     //'#F7F7F7'
            gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',
            border: {
                low: '#CFCFCF',
                normal: '',
                high: '#E6E6E6'
            },

            text: {
                low: '#AAAAAA',
                normal: '#555555',
                high: '#000000'
            },

            rule: {
                low: '#E6E6E6',
                normal: '',
                high: '#D7D7D7'
            },

            hover: {
                background: '#B3D4FF',
                gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',
                border: {
                    low: '#94B8EB',
                    normal: '',
                    high: '#E1E8F2'
                },

                text: {
                    low: '#8BB1E4',
                    normal: '#4C71A4',
                    high: '#112B4E'
                },

                rule: {
                    low: '#A2C9FF',
                    normal: '',
                    high: '#CCE1FF'
                }
            }

        },
        normal: {
            background: '#EDF5FF',
            gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

            border: {
                low: '#CFE0F5',
                normal: '',
                high: '#E1F0FF'
            },

            text: {
                low: '#AFC6E1',
                normal: '#345781',
                high: '#011023'
            },

            rule: {
                low: '#DBE6F4',
                normal: '',
                high: '#FFF'
            },

            hover: {
                background: '#C3D6ED',
                gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

                border: {
                    low: '#B3CCEB',
                    normal: '',
                    high: '#E1F0FF'
                },

                text: {
                    low: '#8CA8C9',
                    normal: '#2A5282',
                    high: '#000000'
                },

                rule: {
                    low: '#AEC3DD',
                    normal: '',
                    high: '#DFE9F5'
                }
            }

        },

        high: {
            background: '#E6E6E6',
            gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

            border: {
                    low: '#ADADAD',
                    normal: '',
                    high: '#DADADA'
            },

            text: {
                low: '#B7B7B7',
                normal: '#606060',
                high: '#000'
            },

            rule: {
                low: '#CDCDCD',
                normal: '',
                high: '#FBFBFB'
            },

            hover: {
                background: '#CBCBCB',
                gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

                border: {
                    low: '#ADADAD',
                    normal: '',
                    high: '#BEBEBE'
                },

                text: {
                    low: '#999999',
                    normal: '#323232',
                    high: '#000'
                },

                rule: {
                    low: '#B8B8B8',
                    normal: '',
                    high: '#E3E3E3'
                }

            }

        },


        highest: {
            background: '#3355BA',
            gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

            border: {
                low: '#0B2981',
                normal: '',
                high: '#6680CC'
            },

            text: {
                low: '#708EE6',
                normal: '#D9E2FF', //space.block.normal.text.low,//
                high: '#fff'
            },

            rule: {
                low: '#223A80',
                normal: '',
                high: '#4A69C4'
            },

            hover: {
                background: '#1B3A95',
                gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

                border: {
                    low: '#041D67',
                    normal: '',
                    high: '#6680CC'
                },

                text: {
                    low: '#5675CF',
                    normal: '#EFF3FF',
                    high: '#fff'
                },

                rule: {
                    low: '#162D6F',
                    normal: '',
                    high: '#314D9F'
                }
            }

        }

    }
};

var keyColor = {              //
        page: '#ffffff',
        background: '#ffffff',      // orange-sat:low, lit:high =F9F6F2      green, sat:low, lit: high = F4F7F5
        block: {
            low: {
                background: '',
            },
            normal: {
                background: '',
            },
            high: {
                background: '',
            },
            highest: {
                background: '#3355BA',  //'sam blue#'      brick red=B54A4A      ff0000
            }
        }
    };
