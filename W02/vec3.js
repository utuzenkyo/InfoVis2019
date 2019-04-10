// Constructor
Vec3 = function( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.min = function()
{
    if (this.x <= this.y)
    {
	if ( this.x <= this.z)
	{
	    return this.x;
	}
	else
	{
	    return this.z;
	}
    }
    else
    {
	if ( this.y <= this.z)
	{
	    return this.y;
	}
	else
	{
	    return this.z;
	}
    }
}

Vec3.prototype.max = function()
{
    if (this.x <= this.y)
    {
	if ( this.y <= this.z)
	{
	    return this.z;
	}
	else
	{
	    return this.y;
	}
    }
    else
    {
	if ( this.x <= this.z)
	{
	    return this.z;
	}
	else
	{
	    return this.x;
	}
    }
}

Vec3.prototype.mid = function()
{
    if (this.x <= this.y)
    {
	if (this.x >= this.z)
	{
	    return this.x;
	}
	else
	{
	    if (this.y <= this.z)
	    {
		return this.y;
	    }
	    else
	    {
		return this.z;
	    }
	}
    }
    else
    {
	if ( this.y >= this.z)
	{
	    return this.y;
	}
	else
	{
	    if (this.x >= this.z)
	    {
		return this.z;
	    }
	    else
	    {
		return this.x;
	    }
	}
    }
}

area = function(v1,v2,v3)
{
	var u1=v2.x-v1.x;
	var u2=v2.y-v1.y;
	var u3=v2.z-v1.z;
	var w1=v3.x-v1.x;
	var w2=v3.y-v1.y;
	var w3=v3.z-v1.z;
	var a1=u2*w3-w2*u3;
	var a2=u3*w1-w3*u1;
	var a3=u1*w2-u2*w1;
	var s=Math.sqrt(a1*a1+a2*a2+a3*a3)
	return s/2;
}