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
	
